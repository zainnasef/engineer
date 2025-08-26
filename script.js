// شريط التنقل للجوال
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

// زر العودة للأعلى
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

// حاسبة GPA (لصفحة gpa.html)
if (document.getElementById("gpaForm")) {
    const gpaForm = document.getElementById("gpaForm");
    const coursesContainer = document.getElementById("coursesContainer");
    const addCourseBtn = document.getElementById("addCourseBtn");
    const resultDiv = document.getElementById("result");
    const gpaValue = document.getElementById("gpaValue");
    
    let courseCount = 1;
    
    // إضافة مادة جديدة
    addCourseBtn.addEventListener("click", () => {
        courseCount++;
        const courseRow = document.createElement("div");
        courseRow.classList.add("course-row");
        courseRow.innerHTML = `
            <input type="text" placeholder="اسم المادة" required>
            <select class="grade" required>
                <option value="">اختر الدرجة</option>
                <option value="4">A (4 points)</option>
                <option value="3.7">A- (3.7 points)</option>
                <option value="3.3">B+ (3.3 points)</option>
                <option value="3">B (3 points)</option>
                <option value="2.7">B- (2.7 points)</option>
                <option value="2.3">C+ (2.3 points)</option>
                <option value="2">C (2 points)</option>
                <option value="1.7">C- (1.7 points)</option>
                <option value="1.3">D+ (1.3 points)</option>
                <option value="1">D (1 point)</option>
                <option value="0">F (0 points)</option>
            </select>
            <input type="number" class="hours" placeholder="عدد الساعات" min="1" required>
            <button type="button" class="remove-course">×</button>
        `;
        coursesContainer.appendChild(courseRow);
        
        // إضافة حدث لإزالة المادة
        courseRow.querySelector(".remove-course").addEventListener("click", () => {
            if (courseCount > 1) {
                courseRow.remove();
                courseCount--;
            }
        });
    });
    
    // حساب المعدل
    gpaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let totalPoints = 0;
        let totalHours = 0;
        let isValid = true;
        
        document.querySelectorAll(".course-row").forEach(row => {
            const grade = parseFloat(row.querySelector(".grade").value);
            const hours = parseFloat(row.querySelector(".hours").value);
            
            if (isNaN(grade) || isNaN(hours)) {
                isValid = false;
                return;
            }
            
            totalPoints += grade * hours;
            totalHours += hours;
        });
        
        if (!isValid || totalHours === 0) {
            alert("يرجى التأكد من إدخال جميع البيانات بشكل صحيح");
            return;
        }
        
        const gpa = totalPoints / totalHours;
        gpaValue.textContent = gpa.toFixed(2);
        resultDiv.style.display = "block";
    });
}

// إضافة حدث لإزالة المواد (للصفحات التي تحتوي عليها)
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-course")) {
        const courseRow = e.target.closest(".course-row");
        if (document.querySelectorAll(".course-row").length > 1) {
            courseRow.remove();
        }
    }
});