"""Isolated signup browser test; Vite must run on port 5182."""
from urllib.parse import urlparse
from uuid import UUID
from playwright.sync_api import sync_playwright, expect

calls=[]
blocked=False

def handler(route):
    path=urlparse(route.request.url).path
    if not path.startswith('/api/'):
        route.continue_(); return
    if route.request.method == 'OPTIONS':
        route.fulfill(status=204,headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*'}); return
    calls.append((path,route.request.post_data_json))
    if path.endswith('/register/'):
        if blocked:
            route.fulfill(status=429,json={'detail':'Registration limit reached for this device.'},headers={'Access-Control-Allow-Origin':'*'}); return
        data={'message':'Account created. You can now sign in.'}
    else:
        data={}
    route.fulfill(json=data,headers={'Access-Control-Allow-Origin':'*'})

with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True)
    context=browser.new_context()
    context.route('**/api/**',handler)
    page=context.new_page()
    errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    def fill():
        page.get_by_label('Full Name / Company Name').fill('New Student')
        page.get_by_label('Email',exact=True).fill('student@example.test')
        page.get_by_label('Password',exact=True).fill('Good-Random-Password-894!')
        page.get_by_label('Confirm Password').fill('Good-Random-Password-894!')
        page.get_by_role('button',name='Create Account',exact=True).click()
    page.goto('http://127.0.0.1:5182/register')
    fill()
    page.wait_for_url('**/login')
    device=calls[0][1]['device_id']
    UUID(device)
    assert page.evaluate("localStorage.getItem('gradlink_device_id')")==device
    assert page.evaluate("localStorage.getItem('access')") is None
    blocked=True
    page.goto('http://127.0.0.1:5182/register'); fill()
    expect(page.locator('form').get_by_text('Registration limit reached for this device.',exact=True)).to_be_visible()
    assert calls[-1][1]['device_id']==device
    assert not errors,errors
    browser.close()
print('PASS: persistent device ID, signup redirects to login, clear 429 error.')
