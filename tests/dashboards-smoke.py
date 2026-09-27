"""Isolated dashboard UI smoke tests. Run Vite at 127.0.0.1:5181 first.
Requires Python Playwright and installed Edge. APIs are mocked; no real records are changed.
"""
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

role = 'student'
fail = False
expired = False
empty = False
requests = []
hired = 1
base = 'http://127.0.0.1:5181'
application = {'id':1, 'job_id':1, 'job_title':'Live graduate job', 'company_name':'Live company', 'company':'Live company', 'candidate_name':'Real candidate', 'candidate_email':'candidate@example.test', 'status':'shortlisted', 'status_display':'Shortlisted', 'applied_at':'2026-09-10T10:00:00Z', 'applied':'Today', 'role':'Live graduate job', 'university':'Live university', 'programme':'Engineering', 'location':'Accra'}
inbox = {'unread_notifications':0, 'unread_messages':0, 'notifications':[], 'messages':[]}

def handle(route):
    global hired
    path = urlparse(route.request.url).path
    if not path.startswith('/api/'):
        route.continue_(); return
    requests.append(path)
    headers = {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'*', 'Access-Control-Allow-Methods':'*'}
    if route.request.method == 'OPTIONS':
        route.fulfill(status=204,headers=headers); return
    if path.endswith('/me/'):
        data = {'id':1, 'role':role, 'name':'Live User', 'email':'live@example.test', 'is_admin':False}
    elif path.endswith('/status/'):
        hired = 2
        application.update(status='accepted',status_display='Accepted')
        data = {'message':'Updated'}
    elif '/dashboard/' in path:
        if fail or expired:
            route.fulfill(status=401 if expired else 503,json={'detail':'Dashboard temporarily unavailable'},headers=headers); return
        if role == 'student':
            data = {'profile':{'first_name':'Live Student', 'programme':'Engineering', 'university':'Live university'}, 'metrics':{'applied_jobs':0 if empty else 7,'saved_jobs':0 if empty else 3,'profile_completion':50,'ai_cv_score':None if empty else 91}, 'recent_applications':[] if empty else [application], 'recommended_jobs':[] if empty else [{'id':2,'title':'Recommended live job','company__name':'Live company','location':'Accra','match_score':89,'deadline':'2026-12-01'}], 'ai_cv_review':None, **inbox}
        else:
            data = {'company':{'name':'Live company'}, 'metrics':{'active_jobs':0 if empty else 4,'total_jobs':0 if empty else 6,'pending_jobs':0 if empty else 2,'total_applications':0 if empty else 9,'shortlisted_candidates':0 if empty else 3,'hired_candidates':0 if empty else hired}, 'recent_applicants':[] if empty else [application], 'trend':[{'month':'Aug 2026','applications':0 if empty else 3,'shortlisted':0 if empty else 1,'jobs':0 if empty else 2},{'month':'Sep 2026','applications':0 if empty else 6,'shortlisted':0 if empty else 2,'jobs':0 if empty else 4}], 'pipeline':[{'status':'accepted','label':'Accepted','count':0 if empty else hired}], 'applications_per_job':[] if empty else [{'id':1,'title':'Live graduate job','applications_count':9}], **inbox}
    else:
        data = []
    route.fulfill(json=data,headers=headers)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge',headless=True)
    context = browser.new_context(viewport={'width':1440,'height':1000})
    context.add_init_script("localStorage.setItem('access','isolated-token');")
    context.route('**/api/**',handle)
    page=context.new_page()
    errors=[]
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.goto(base+'/student/dashboard')
    expect(page.get_by_role('heading',name="Live Student's Dashboard")).to_be_visible()
    expect(page.get_by_text('Recommended live job',exact=True)).to_be_visible()
    expect(page.get_by_role('heading',name='Recent Applications',exact=True)).to_be_visible()
    assert '/api/student/applications/' not in requests, 'Redundant application request'
    assert 'Preview:' not in page.locator('body').inner_text()
    empty=True
    page.get_by_role('button',name='Refresh',exact=True).click()
    expect(page.get_by_text('No CV review recorded yet',exact=True)).to_be_visible()
    expect(page.get_by_text('No recommendations are available yet.',exact=False)).to_be_visible()
    fail=True
    page.get_by_role('button',name='Refresh',exact=True).click()
    expect(page.get_by_role('alert')).to_contain_text('Dashboard temporarily unavailable')
    fail=False; empty=False
    page.get_by_role('button',name='Refresh',exact=True).click()
    expect(page.get_by_text('Recommended live job',exact=True)).to_be_visible()
    role='employer'; requests.clear()
    page.goto(base+'/employer/dashboard')
    expect(page.get_by_role('heading',name='Employer Report · Live company',exact=True)).to_be_visible()
    expect(page.get_by_text('Hired Candidates',exact=True)).to_be_visible()
    expect(page.get_by_text('Jobs posted this month: 4',exact=True)).to_be_visible()
    expect(page.get_by_text('Real candidate',exact=True)).to_be_visible()
    assert '/api/employer/applications/recent/' not in requests, 'Redundant applicant request'
    page.locator('tbody select').select_option('accepted')
    expect(page.locator('[data-slot="card"]').filter(has_text='Hired Candidates').locator('[data-slot="card-title"]')).to_have_text('2')
    expect(page.get_by_text('Accepted',exact=True).first).to_be_visible()
    page.set_viewport_size({'width':390,'height':844})
    expect(page.get_by_role('heading',name='Employer Report · Live company',exact=True)).to_be_visible()
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'Mobile overflow'
    empty=True
    page.get_by_role('button',name='Refresh',exact=True).click()
    expect(page.get_by_text('No applications in the last six months.',exact=True)).to_be_visible()
    expect(page.get_by_text('No jobs in the last six months.',exact=True)).to_be_visible()
    expired=True
    page.get_by_role('button',name='Refresh',exact=True).click()
    page.wait_for_url('**/login')
    assert not errors, errors
    browser.close()
print('PASS: both dashboards, real response values, no duplicate list requests, zero/empty states, retry, status-refresh metrics, mobile layout and expired-session redirect.')
