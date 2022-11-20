import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Assignment from "./studentpages/assignment";
import Courses from "./studentpages/courses";
import Grades from "./studentpages/grades";
import Home from "./studentpages/Home";
import Modules from "./studentpages/modules";
import TeacherHome from "./teacherpages/teacherHome";
import ModuleForm from "./teacherpages/Form/ModuleForm";
import AssignmentForm from "./teacherpages/Form/AssignmentForm";
import CourseForm from "./teacherpages/Form/CourseForm";
import EnrollmentForm from "./teacherpages/Form/EnrollmentForm";
import AuthForm from "./login/auth";
import LayoutStudentNav from "./components/UI/LayoutStudentNav";
import LayoutTeacherNav from "./components/UI/LayoutTeacherNav";
import AssignmentStudentUpload from "./studentpages/assignment_upload";
import TeacherStudent from "./teacherpages/teacherStudent";
import TeacherAsssignment from "./teacherpages/teacherAssignment";
import TeacherCourses from "./teacherpages/teacherCourse";
import StudentForm from "./teacherpages/Form/StudentForm";
import UserProfile from './studentpages/userProfile';
import TeacherModules from './teacherpages/teacherModules';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthForm />} />
          <Route element={<LayoutStudentNav />}>
            <Route path="/student/home" element={<Home />} />
            <Route path="/student/grades" element={<Grades />} />
            <Route path="/student/assignment" element={<Assignment />} />
            <Route path="/student/assignment/:assignmentID" element={<AssignmentStudentUpload />} />
            <Route path="/student/courses" element={<Courses />} />
            <Route path="/student/courses/:courseID" element={<Modules />} />
            <Route path="/student/profile" element={<UserProfile />} />
          </Route>
          <Route element={<LayoutTeacherNav/>}>
            <Route path="/teacher/home" element={<TeacherHome />} />
            <Route path="/teacher/students" element={<TeacherStudent />} />
            <Route path="/teacher/assignments" element={<TeacherAsssignment />} />
            <Route path="/teacher/courses" element={<TeacherCourses />} />
            <Route path="/teacher/courses/:courseID" element={<TeacherModules />} />
            <Route path="/studentform" element={<StudentForm />} />
            <Route path="/modulesform" element={<ModuleForm />} />
            <Route path="/assignmentform" element={<AssignmentForm />} />
            <Route path="/courseform" element={<CourseForm />} />
            <Route path="/enrollmentform" element={<EnrollmentForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
