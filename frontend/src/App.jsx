import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import CreateStudent from "./pages/admin/students/CreateStudent";
import EditStudent from "./pages/admin/students/EditStudent";
import ProtectedRoute from "./components/ProtectedRoute";

import StudentDashboard from "./pages/student/StudentDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";


import Students from "./pages/admin/Students";
import Staff from "./pages/admin/Staff";
import CreateStaff from "./pages/admin/staff/CreateStaff";
import EditStaff from "./pages/admin/staff/editstaff";

import Programs from "./pages/admin/programs/Programs";
import CreateProgram from "./pages/admin/programs/CreateProgram";
import EditProgram from "./pages/admin/programs/EditProgram";

import Courses from "./pages/admin/courses/Courses";
import CreateCourse from "./pages/admin/courses/CreateCourse";
import EditCourse from "./pages/admin/courses/EditCourse";

import Enrollments from "./pages/admin/enrollments/Enrollments";
import CreateEnrollment from "./pages/admin/enrollments/CreateEnrollment";
import EditEnrollment from "./pages/admin/enrollments/EditEnrollment";

import Departments from "./pages/admin/departments/Departments";
import CreateDepartment from "./pages/admin/departments/CreateDepartment";
import EditDepartment from "./pages/admin/departments/EditDepartment";

import RegisterCourse from "./pages/student/RegisterCourse";
import Timetable from "./pages/student/Timetable";
import Results from "./pages/student/Results";
import Transcript from "./pages/student/Transcript";
import StudentProfile from "./pages/student/Profile";
import StudentAttendance from "./pages/student/StudentAttendance";

import MyClasses from "./pages/staff/Myclasses";
import Attendance from "./pages/staff/Attendance";
import StaffGrades from "./pages/staff/StaffGrades";
import StaffProfile from "./pages/staff/StaffProfile";
import UpdateStaffProfile from "./pages/staff/UpdateStaffProfile";
import AttendanceReport from "./pages/staff/AttendanceReport";
import StaffTimetable from "./pages/staff/StaffTimetable";

import Semesters from "./pages/admin/semesters/Semesters";
import CreateSemester from "./pages/admin/semesters/CreateSemester";
import EditSemester from "./pages/admin/semesters/EditSemester";

import CourseOfferings from "./pages/admin/course-offerings/CourseOfferings";
import CreateCourseOffering from "./pages/admin/course-offerings/CreateCourseOffering";
import EditCourseOffering from "./pages/admin/course-offerings/EditCourseOffering";

import Analytics from "./pages/admin/analytics/Analytics";
import Dashboard from "./pages/admin/Dashboard";

import Grades from "./pages/admin/grades/Grades";
import EditGrade from "./pages/admin/grades/editgrade";

import Reports from "./pages/admin/reports/Reports";
import EnrollmentReport from "./pages/admin/reports/EnrollmentReport";
import PerformanceReport from "./pages/admin/reports/PerformanceReport";

import Notifications from "./pages/admin/notifications/Notifications";
import CreateNotification from "./pages/admin/notifications/CreateNotification";

import AutoLogout from "./components/AutoLogout";

import Profile from "./pages/student/Profile";


function App() {

    return (


        <BrowserRouter>
                <AutoLogout />

            <Routes>

                {/* Default Route */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                        />
                    }
                />

                {/* Login */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />

                {/* Student Routes */}

                <Route
                    path="/student"
                    element={

                        <ProtectedRoute
                            allowedRole="STUDENT"
                        >

                            <StudentDashboard />

                        </ProtectedRoute>

                    }
                />
                <Route
                    path="/student/studentdashboard"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/profile"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/student/register-course"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <RegisterCourse />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/student/timetable"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <Timetable />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/student/results"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <Results />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/transcript"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <Transcript />
                        </ProtectedRoute>
                    }
                /> 
                <Route
                    path="/student/studentattendance"
                    element={
                        <ProtectedRoute allowedRole="STUDENT">
                            <StudentAttendance />
                        </ProtectedRoute>             
                    }
                
                />

                {/* Staff Routes */}

                <Route
                    path="/staff"
                    element={

                        <ProtectedRoute
                            allowedRole="STAFF"
                        >

                            <StaffDashboard />

                        </ProtectedRoute>

                    }
                />
                <Route
                    path="/staff/staffdashboard"
                    element={
                        <ProtectedRoute
                            allowedRole="STAFF"

                        >
                            <StaffDashboard />

                        </ProtectedRoute>

                            
                    }
                />
                <Route
                    path="/staff/myclasses"
                    element={
                        <ProtectedRoute allowedRole="STAFF">
                            <MyClasses />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/staff/attendance/:id"
                    element={
                        <ProtectedRoute allowedRole="STAFF">
                            <Attendance />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/staff/attendance-report/:id"
                    element={
                        <ProtectedRoute allowedRole="STAFF">
                            <AttendanceReport />

                        </ProtectedRoute>
                            
                        
                    }
                />
                <Route
                    path="/staff/staffgrades/:id"
                    element={
                        <ProtectedRoute allowedRole="STAFF">
                            <StaffGrades />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/staff/staffprofile"
                    element={
                        <ProtectedRoute allowedRole="STAFF">
                            <StaffProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/staff/profile/update"
                    element={
                        <ProtectedRoute allowedRole="STAFF">
                            <UpdateStaffProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/staff/stafftimetable"
                    element={
                        <ProtectedRoute allowedRole="STAFF">
                            <StaffTimetable />
                        </ProtectedRoute>
                    }
                
                />

                {/* Admin Dashboard */}

               
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            allowedRole="ADMIN"
                        >
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/grades"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Grades />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/admin/grades/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditGrade />
                        </ProtectedRoute>
                    }
                />
                

                <Route
                    path="/admin/students"
                    element={

                        <ProtectedRoute
                            allowedRole="ADMIN"
                        >

                            <Students />

                        </ProtectedRoute>

                    }

                />
                <Route
                    path="/admin/students/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateStudent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/students/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditStudent />
                        </ProtectedRoute>
                    }
                />

                 <Route
                    path="/admin/staff"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Staff />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/staff/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateStaff />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/staff/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditStaff />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/programs"
                    element={
                        <ProtectedRoute 
                            allowedRole="ADMIN">
                            <Programs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/programs/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateProgram />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/programs/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditProgram />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/courses"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">                    
                            <Courses />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/courses/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateCourse />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/courses/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditCourse />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/enrollments"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Enrollments />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/enrollments/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateEnrollment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/enrollments/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditEnrollment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/departments"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Departments />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/departments/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateDepartment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/departments/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditDepartment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/semesters"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Semesters />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/semesters/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateSemester />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/semesters/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditSemester />
                        </ProtectedRoute>
                    }
                />

                 <Route
                    path="/admin/course-offerings"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CourseOfferings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/course-offerings/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateCourseOffering />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/course-offerings/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditCourseOffering />
                        </ProtectedRoute>
                    }
                />

                 <Route
                    path="/admin/enrollments"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Enrollments />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/enrollments/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateEnrollment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/enrollments/edit/:id"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EditEnrollment />
                        </ProtectedRoute>
                    }
                /> 
                <Route
                    path="/admin/analytics"
                    element={
                        <ProtectedRoute
                            allowedRole="ADMIN"
                        >
                            <Analytics />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/reports"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Reports />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/reports/enrollment"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <EnrollmentReport />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/reports/performance"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <PerformanceReport />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/notifications"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <Notifications />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/notifications/create"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <CreateNotification />
                        </ProtectedRoute>
                    }
                />

                {/* 404 */}

                <Route
                    path="*"
                    element={
                        <h1>
                            404 Page Not Found
                        </h1>
                    }
                />
                

            </Routes>

        </BrowserRouter>
        

    );

}

export default App;