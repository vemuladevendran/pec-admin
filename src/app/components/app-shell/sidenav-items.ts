export const menuItems = [
    ['school', 'Teachers', ['/teachers']],
    ['people', 'STUDENT', ['/students']],
    ['subject', 'DEPARTMENT', ['/department']],
    ['summarize', 'Time Table', ['/timetable']],
    ['summarize', 'ATTENDANCE-REPORT', ['/attendance-report']],
    ['subject', 'SUBJECTS', ['/subjects']],
    ['newspaper', 'Notes', ['/notes']],
    ['summarize', 'Admins', ['/admin']],
    ['account_circle', 'Profile', ['/profile']],
].map(([icon, text, path]) => ({ icon, text, path }));