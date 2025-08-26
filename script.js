// Navigation toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Back to top button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// GPA Calculator functionality (only on GPA page)
if (document.getElementById('calculateGPA')) {
    const generateCoursesBtn = document.getElementById('generateCourses');
    const courseCountInput = document.getElementById('courseCount');
    const coursesContainer = document.getElementById('coursesContainer');
    const calculateGPABtn = document.getElementById('calculateGPA');
    const resultContainer = document.getElementById('result');
    
    // Grade point values
    const gradePoints = {
        'A+': 4.0, 'A': 4.0, 
        'B+': 3.5, 'B': 3.0, 
        'C+': 2.5, 'C': 2.0, 
        'D+': 1.5, 'D': 1.0, 
        'F': 0.0
    };
    
    // Generate course input fields
    generateCoursesBtn.addEventListener('click', () => {
        const courseCount = parseInt(courseCountInput.value);
        
        if (isNaN(courseCount) || courseCount < 1) {
            alert('يرجى إدخال عدد مواد صحيح');
            return;
        }
        
        let coursesHTML = '';
        
        for (let i = 1; i <= courseCount; i++) {
            coursesHTML += `
                <div class="course-input">
                    <label>المادة ${i}:</label>
                    <input type="text" placeholder="اسم المادة" class="course-name">
                    <select class="course-grade">
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                    <input type="number" placeholder="الساعات" min="1" class="course-hours" value="3">
                </div>
            `;
        }
        
        coursesContainer.innerHTML = coursesHTML;
    });
    
    // Calculate GPA
    calculateGPABtn.addEventListener('click', () => {
        const courseInputs = coursesContainer.querySelectorAll('.course-input');
        
        if (courseInputs.length === 0) {
            alert('يرجى إنشاء حقول المواد أولاً');
            return;
        }
        
        let totalPoints = 0;
        let totalHours = 0;
        let allValid = true;
        
        courseInputs.forEach(course => {
            const grade = course.querySelector('.course-grade').value;
            const hoursInput = course.querySelector('.course-hours');
            const hours = parseInt(hoursInput.value);
            
            if (isNaN(hours) || hours < 1) {
                alert('يرجى إدخال عدد ساعات صحيح لكل مادة');
                hoursInput.focus();
                allValid = false;
                return;
            }
            
            totalPoints += gradePoints[grade] * hours;
            totalHours += hours;
        });
        
        if (!allValid) return;
        
        const gpa = totalPoints / totalHours;
        
        resultContainer.innerHTML = `
            <p>المعدل التراكمي (GPA) هو: <strong>${gpa.toFixed(2)}</strong></p>
            <p>إجمالي الساعات: <strong>${totalHours}</strong></p>
        `;
    });
}

// Initialize the page with one course input if on GPA page
if (document.getElementById('generateCourses')) {
    document.getElementById('generateCourses').click();
}