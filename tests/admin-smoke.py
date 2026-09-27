"""Browser smoke test with isolated API fixtures; never changes real platform records.
Run Vite on 127.0.0.1:5179, then run this with Python + Playwright and Edge installed.
"""
import json
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

BASE = 'http://127.0.0.1:5179'
identity = {'id': 1, 'email': 'admin@example.test', 'role': 'admin', 'is_admin': True}
row = {'id': 1, 'email':'student@example.test', 'role':'student', 'is_active':True, 'is_verified':False, 'title':'Example', 'name':'Example', 'full_name':'Test Student', 'student_email':'student@example.test', 'company_name':'Example Company', 'job_title':'Graduate engineer', 'job':1, 'company':1, 'user':1, 'status':'pending', 'request_type':'company', 'reason':'Review required', 'resolved':False, 'moderation_note':'', 'plan_name':'Basic', 'amount_paid':'50.00', 'payment_method':'card', 'current_status':'active', 'published':False, 'slug':'example', 'content':'Advice', 'test_type':'logical', 'duration_minutes':15, 'question_count':1, 'attempt_count':0, 'average_score':None, 'recipient':'student@example.test', 'notification_type':'general', 'is_read':False, 'action':'updated', 'target_type':'Job', 'target_id':'1', 'description':'Approved job', 'timestamp':'2026-09-01T12:00:00Z', 'admin_email':'admin@example.test', 'created_at':'2026-09-01T12:00:00Z'}
mutations = []
fail_users = False

def handler(route):
    path = urlparse(route.request.url).path
    if not path.startswith('/api/'):
        route.continue_(); return
    if route.request.method == 'OPTIONS':
        route.fulfill(status=204, headers={'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'*', 'Access-Control-Allow-Methods':'*'}); return
    if route.request.method != 'GET':
        mutations.append((path, route.request.method, route.request.post_data_json))
        data = {'recipients': 1} if 'announcements' in path else row
    elif path.endswith('/me/'):
        data = identity
    elif path.endswith('/overview/'):
        data = {'stats': {'students':12, 'employers':4, 'verified_employers':3, 'active_jobs':8, 'applications':24, 'pending_verifications':1, 'unresolved_reports':2, 'active_subscriptions':3, 'monthly_recorded_amount':'150.00'}, 'revenue_note':'Recorded subscription amounts, not settlement confirmation.', 'charts': {key:[{'name':'2026-08','value':2},{'name':'2026-09','value':5}] for key in ['user_growth','jobs_posted','applications','jobs_by_industry','jobs_by_location','application_status']}, 'recent_activity':[row], 'recent_users':[row], 'recent_jobs':[row], 'recent_applications':[row]}
    elif path.endswith('/settings/'):
        data = {'industries':[['technology','Technology']], 'job_types':[['entry_level','Entry level']], 'cv_file_types':['.pdf','.docx'], 'max_cv_size_bytes':10485760, 'platform_contact':'', 'configuration_note':'Server configuration'}
    elif path.endswith('/users/') and fail_users:
        route.fulfill(status=503,json={'detail':'Test service unavailable'},headers={'Access-Control-Allow-Origin':'*'}); return
    elif path.endswith('/blogs/example/'):
        data = row
    elif path.endswith('/blogs/'):
        data = [row]
    else:
        data = {'count':1, 'next':None, 'previous':None, 'results':[row]}
    route.fulfill(json=data, headers={'Access-Control-Allow-Origin':'*'})

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    context = browser.new_context(viewport={'width':1440,'height':1000})
    context.add_init_script("localStorage.setItem('access','isolated-test-token');")
    context.route('**/api/**', handler)
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    titles = {'dashboard':'Admin dashboard','users':'User management','employers':'Employers','jobs':'Job moderation','applications':'Applications oversight','verifications':'Verification queue','reports':'Reports and moderation','subscriptions':'Employer subscriptions','content':'Career content','tests':'Psychometric tests','notifications':'Sent notifications','analytics':'Platform analytics','activity':'Admin activity log','settings':'Job categories'}
    for route, title in titles.items():
        page.goto(f'{BASE}/admin/{route}')
        expect(page.get_by_role('heading',name=title,exact=True)).to_be_visible(timeout=20000)
        if route not in ['dashboard','analytics']:
            expect(page.get_by_role('table')).to_be_visible(timeout=10000)
    page.goto(f'{BASE}/admin/users')
    page.get_by_role('button',name='Edit',exact=True).click()
    page.get_by_role('checkbox').first.uncheck()
    page.get_by_role('button',name='Confirm',exact=True).click()
    expect(page.get_by_role('dialog')).to_have_count(0)
    assert mutations[-1][1:] == ('PATCH', {'is_active':False,'is_verified':False}), mutations[-1]
    page.goto(f'{BASE}/admin/content')
    page.get_by_role('button',name='Add article',exact=True).click()
    page.get_by_role('textbox',name='Title',exact=True).fill('New advice')
    page.get_by_role('textbox',name='Unique URL slug',exact=True).fill('new-advice')
    page.get_by_role('textbox',name='Article content',exact=True).fill('Useful advice')
    page.get_by_role('button',name='Confirm',exact=True).click()
    expect(page.get_by_role('dialog')).to_have_count(0)
    assert mutations[-1][1] == 'POST'
    page.goto(f'{BASE}/admin/notifications')
    page.get_by_label('Title',exact=True).fill('Notice')
    page.get_by_label('Message',exact=True).fill('Testing isolated announcement')
    page.get_by_role('button',name='Review announcement').click()
    page.get_by_role('button',name='Send now').click()
    expect(page.get_by_role('dialog')).to_have_count(0)
    assert mutations[-1][0].endswith('/announcements/')
    fail_users = True
    page.goto(f'{BASE}/admin/users')
    expect(page.get_by_role('alert').filter(has_text='Test service unavailable')).to_be_visible()
    fail_users = False
    page.get_by_role('button',name='Refresh',exact=True).click()
    expect(page.get_by_role('table')).to_be_visible()
    page.set_viewport_size({'width':390,'height':844})
    page.goto(f'{BASE}/admin/dashboard')
    expect(page.get_by_role('heading',name='Admin dashboard',exact=True)).to_be_visible()
    page.get_by_role('button',name='Toggle Sidebar').click()
    expect(page.get_by_role('dialog')).to_be_visible()
    page.get_by_role('dialog').get_by_role('link',name='Users',exact=True).click()
    expect(page.get_by_role('heading',name='User management')).to_be_visible()
    expect(page.get_by_role('dialog')).to_have_count(0)
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'Mobile page overflow'
    page.goto(f'{BASE}/career-advice/example')
    expect(page.get_by_role('heading',name='Example',exact=True)).to_be_visible()
    identity.update(role='student', is_admin=False)
    page.goto(f'{BASE}/admin/users')
    page.wait_for_url('**/student/dashboard')
    assert not errors, errors
    browser.close()
print('PASS: 14 admin routes, edits, content creation, announcement confirmation, error recovery, mobile navigation, public article and student redirect; no runtime errors.')
