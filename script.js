// script.js

document.addEventListener('DOMContentLoaded', () => {
    // بيانات الدورة
    const courseData = [
        {
            title:"تابعنا علي",
            lessons: [
                { name: ' قناة الواتساب', url: 'https://chat.whatsapp.com/LngT37LeNGzHmQyZ6mSfHp',isTest:false },
                { name: ' قناة اليوتيوب', url: 'https://www.youtube.com/@Afaq-tech-channel',isTest:false },

            ]

        },
        {
            
            title: 'Session 1',
            lessons: [
                { name: 'مشاهدة المحاضرة', url: 'https://youtu.be/SwDWNk4g9E8?si=67hyQN-vHwYWzCZ3',isTest:false },
                { name: 'مصادر الدراسه',
                     subtasks:[
                    {name:"مذكرةالشرح", url:"#"},
                    {name:"العرض التقديمي",url:"#"},]
                 },
                { name: 'اختبار المحاضرة', url: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__maKqChUOTFVWEtLVVhKTklJTUVZVFBVU1lTRlJMNy4u',isTest:true },
            ]
        },
        // END 1
        {
            title: 'Session 2',
            lessons: [
                 { name: 'مشاهدة المحاضرة', url: 'https://youtu.be/SwDWNk4g9E8?si=67hyQN-vHwYWzCZ3',isTest:false },
                { name: 'مصادر الدراسه',
                     subtasks:[
                    {name:"مذكرةالشرح", url:"#"},
                    {name:"العرض التقديمي",url:"#"},]
                 },
                { name: 'اختبار المحاضرة', url: 'https://youtu.be/SwDWNk4g9E8?si=67hyQN-vHwYWzCZ3',isTest:true },
            ]
        },
        {
            title:"Session 3",
            lessons: [
                { name:"Final Exam",
                 subtasks:[
                    {name:"Exam",url:"#"},
                    {name:"Certifcate",url:"#"},]
                }, 
            ]
        },
                {
            title:"Session 4",
            lessons: [
                { name:"Final Exam",
                 subtasks:[
                    {name:"Exam",url:"#"},
                    {name:"Certifcate",url:"#"},]
                }, 
            ]
        },
                {
            title:"Session 5",
            lessons: [
                { name:"Final Exam",
                 subtasks:[
                    {name:"Exam",url:"#"},
                    {name:"Certifcate",url:"#"},]
                }, 
            ]
        },
                {
            title:"Session 6",
            lessons: [
                { name:"Final Exam",
                 subtasks:[
                    {name:"Exam",url:"#"},
                    {name:"Certifcate",url:"#"},]
                }, 
            ]
        },
                {
            title:"Session 7",
            lessons: [
                { name:"Final Exam",
                 subtasks:[
                    {name:"Exam",url:"#"},
                    {name:"Certifcate",url:"#"},]
                }, 
            ]
        },
                {
            title:"Session 8",
            lessons: [
                { name:"Final Exam",
                 subtasks:[
                    {name:"Exam",url:"#"},
                    {name:"Certifcate",url:"#"},]
                }, 
            ]
        },
    ];

 const courseContainer = document.querySelector('.course-container');

    // استرجاع الدروس المكتملة من localStorage
    let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];

    // دالة لحساب إجمالي عدد الدروس (بما في ذلك المهام الفرعية)
    const countTotalLessons = () => {
        let count = 0;
        courseData.forEach(section => {
            section.lessons.forEach(lesson => {
                count++;
                if (lesson.subtasks) {
                    count += lesson.subtasks.length;
                }
            });
        });
        return count;
    };
    
    const totalLessons = countTotalLessons();


    // دالة لتحديث شريط التقدم
    const updateProgressBar = () => {
        const completedCount = completedLessons.length;
        const progressPercentage = (completedCount / totalLessons) * 100;

        const progressBar = document.querySelector('.progress-bar');
        const progressPercentageText = document.querySelector('.progress-percentage');

        progressBar.style.width = `${progressPercentage}%`;
        progressPercentageText.textContent = `${Math.round(progressPercentage)}%`;
    };

    // دالة لإنشاء قائمة الدروس والمهام الفرعية
    const createLessonList = (lessons, parentList) => {
        lessons.forEach(lesson => {
            const lessonItem = document.createElement('li');
            lessonItem.classList.add('lesson-item');

            // إضافة كلاس 'test-lesson' إذا كان الدرس اختبارًا
            if (lesson.isTest) {
                lessonItem.classList.add('test-lesson');
            }

            // إذا كان الدرس يحتوي على مهام فرعية
            if (lesson.subtasks) {
                const subtaskHeader = document.createElement('div');
                subtaskHeader.classList.add('subtask-header');
                // هنا نقوم بوضع الرمز "-" افتراضيًا
                subtaskHeader.innerHTML = `<h3>${lesson.name}</h3><span>-</span>`;
                lessonItem.appendChild(subtaskHeader);

                const subtaskList = document.createElement('ul');
                subtaskList.classList.add('subtask-list');

                createLessonList(lesson.subtasks, subtaskList);
                lessonItem.appendChild(subtaskList);

                subtaskHeader.addEventListener('click', () => {
                    // هنا نعكس المنطق: نستخدم كلاس 'collapsed' للإخفاء
                    subtaskList.classList.toggle('collapsed');
                    subtaskHeader.querySelector('span').textContent = subtaskList.classList.contains('collapsed') ? '+' : '-';
                });
            } else {
                const lessonLink = document.createElement('a');
                lessonLink.href = lesson.url;
                lessonLink.textContent = lesson.name;
                lessonItem.appendChild(lessonLink);

                // إضافة مستمع للضغط على الروابط
                lessonLink.addEventListener('click', () => {
                    if (!completedLessons.includes(lesson.name)) {
                        completedLessons.push(lesson.name);
                        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
                        lessonItem.classList.add('completed');
                        updateProgressBar(); // تحديث شريط التقدم
                    }
                });
            }

            // إضافة كلاس 'completed' إذا كان الدرس مكتملًا بالفعل
            if (completedLessons.includes(lesson.name)) {
                lessonItem.classList.add('completed');
            }

            parentList.appendChild(lessonItem);
        });
    };

    // إنشاء الأقسام والدروس ديناميكيًا
    courseData.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('section');

        const sectionHeader = document.createElement('div');
        sectionHeader.classList.add('section-header');
        sectionHeader.innerHTML = `<h2>${section.title}</h2><span>+</span>`;

        const lessonsList = document.createElement('ul');
        lessonsList.classList.add('lessons-list');

        createLessonList(section.lessons, lessonsList);

        sectionDiv.appendChild(sectionHeader);
        sectionDiv.appendChild(lessonsList);
        courseContainer.appendChild(sectionDiv);
    });

    // إضافة وظيفة الفتح والإغلاق والتنبيه
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            if (index >=0 && index <3) {
                const lessonsList = header.nextElementSibling;
                lessonsList.classList.toggle('active');
                header.querySelector('span').textContent = lessonsList.classList.contains('active') ? '-' : '+';
            } else {
                Swal.fire({
                    title: 'قريباً!',
                    text: 'سوف يتم توفير هذا المحتوى لك قريبا',
                    icon: 'info',
                    confirmButtonText: 'حسناً'
                });
            }
        });
    });

    // تحديث شريط التقدم عند تحميل الصفحة
    updateProgressBar();

});
