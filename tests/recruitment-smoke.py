"""Mocked browser smoke test. Start Vite on 127.0.0.1:5182 first."""
from datetime import datetime, timedelta
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

apps=[{'id':1,'job_id':7,'candidate_name':'Jane Doe','candidate_email':'jane@example.test','role':'Graduate Developer','university':'Example','programme':'CS','status':'submitted','status_display':'Submitted','applied':'Today','match':{'score':50,'breakdown':[],'note':'Assistance only.'}}, {'id':2,'job_id':7,'candidate_name':'John Doe','candidate_email':'john@example.test','role':'Graduate Developer','status':'reviewed','status_display':'Reviewed','applied':'Today','match':{'score':None,'breakdown':[]}}]
calls=[]
def handler(route):
    request=route.request
    path=urlparse(request.url).path
    if not path.startswith('/api/'):
        route.continue_(); return
    headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*'}
    if request.method=='OPTIONS': route.fulfill(status=204,headers=headers); return
    data={}
    if request.method!='GET': calls.append((path,request.post_data_json))
    if path.endswith('/me/'): data={'id':1,'role':'employer','email':'employer@example.test','name':'Employer'}
    elif path.endswith('/applications/recent/'): data=apps
    elif path.endswith('/applications/bulk/'):
        for app in apps:
            if app['id'] in request.post_data_json['application_ids']:
                app['status']='interview_invited';app['status_display']='Interview Invited'
        data={'updated':len(request.post_data_json['application_ids'])}
    elif path.endswith('/messages/bulk/'): data={'recipients':2,'email_queued':True}
    elif path.endswith('/status/'):
        app=next(a for a in apps if a['id']==int(path.split('/')[-3])); app['status']='interview_scheduled';app['status_display']='Interview Scheduled';data={'application':app}
    elif path.endswith('/employer/jobs/'): data=[{'id':7,'title':'Graduate Developer','is_active':True,'posted_at':'2026-09-30','screening_questions':[],'matching_config':{}}]
    elif path.endswith('/job-categories/'): data=[]
    route.fulfill(json=data,headers=headers)

with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True)
    context=browser.new_context(viewport={'width':1440,'height':1000})
    context.add_init_script("localStorage.setItem('access','fixture'); localStorage.setItem('role','employer');")
    context.route('**/api/**',handler)
    page=context.new_page(); errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.goto('http://127.0.0.1:5182/employer/applicants')
    page.get_by_role('checkbox',name='Select all visible applicants').click()
    page.get_by_role('button',name='Bulk actions',exact=True).click()
    page.get_by_role('menuitem',name='Shortlist & invite').click()
    expect(page.get_by_role('alertdialog')).to_contain_text('2 selected applicants')
    page.get_by_role('button',name='Confirm',exact=True).click()
    expect(page.locator('table').get_by_text('Interview Invited',exact=True)).to_have_count(2)
    page.get_by_role('checkbox',name='Select all visible applicants').click()
    page.get_by_role('button',name='Send bulk message').click()
    page.get_by_label('Message subject',exact=True).fill('Interview information')
    page.get_by_label('Bulk message',exact=True).fill('Please prepare your portfolio.')
    page.get_by_role('button',name='Send to 2 applicants').click()
    expect(page.get_by_role('dialog')).to_have_count(0)
    assert calls[-1][1]['application_ids']==[1,2]
    page.get_by_role('button',name='Actions',exact=True).first.click()
    page.get_by_role('menuitem',name='Schedule / reschedule interview').click()
    page.get_by_label('Interview date and time',exact=True).fill((datetime.now()+timedelta(days=2)).strftime('%Y-%m-%dT%H:%M'))
    page.get_by_label('Location',exact=True).fill('Accra office')
    page.get_by_role('button',name='Save and notify').click()
    expect(page.locator('table').get_by_text('Interview Scheduled',exact=True)).to_have_count(1)
    assert calls[-1][1]['interview_date'].endswith('Z')
    page.screenshot(path='tests/recruitment-smoke.png',full_page=True)
    page.goto('http://127.0.0.1:5182/employer/jobs')
    expect(page.get_by_text('Graduate Developer',exact=True)).to_be_visible()
    page.goto('http://127.0.0.1:5182/employer/post-job')
    page.get_by_role('button',name='Add screening question').click()
    expect(page.get_by_label('Desired answer (optional)',exact=True)).to_be_visible()
    assert not errors,errors
    browser.close()
print('PASS: employer bulk selection, confirmation, messaging, and event-based interview scheduling.')
