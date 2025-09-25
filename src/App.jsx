import { BrowserRouter, Routes, Route } from "react-router-dom"

// User
import AuthLayout from "./layouts/AuthLayout";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserMoviesProvider from "./pages/user/context/UserContextMovies";
import UserCategoryProvider from "./pages/user/context/CategoryContext";
import UserGetMovies from "./pages/user/UserGetMovies";
import UserMoviePremium from "./pages/user/UserMoviePremium";
import MoviesPremiumDetails from "./pages/user/MoviePremiumDetails";
import UserFavoris from "./pages/user/UserFavoris";
import UserWatchLater from "./pages/user/UserWatchLater";
import MoviesDetails from "./pages/user/MovieDetails";
// import Test from "./pages/TestPage";

// Admin
import ProtectedRoute from "./routes/protectedRoutes";
import CategoryContextProvider from "./pages/admin/context/AdminCategoryContext";
import AdminMoviesProvider from "./pages/admin/context/AdminMoviesContext";
import UploadMovies from "./pages/admin/UploadMovies";
import AdminMovie from "./pages/admin/AdminGetMovie";
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<AuthLayout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/test" element={<Test />} /> */}

          {/* Routes admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminMoviesProvider>
                  <CategoryContextProvider>
                    <UploadMovies />
                  </CategoryContextProvider>
                </AdminMoviesProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/all"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminMoviesProvider>
                  <CategoryContextProvider>
                    <AdminMovie />
                  </CategoryContextProvider>
                </AdminMoviesProvider>
              </ProtectedRoute>
            }
          />

          {/* Routes utilisateur connecté */}
          <Route
            path="/movies"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <UserMoviesProvider>
                  <UserCategoryProvider>
                    <UserGetMovies />
                  </UserCategoryProvider>
                </UserMoviesProvider>
              </ProtectedRoute>
            }
          />

          <Route path="/movies/:id" element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <MoviesDetails/>
            </ProtectedRoute>
          }/>

          <Route
            path="/movies/premium"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <UserMoviesProvider>
                  <UserCategoryProvider>
                    <UserMoviePremium />
                  </UserCategoryProvider>
                </UserMoviesProvider>
              </ProtectedRoute>
            }
          />

          <Route path="/movies/premium/:id" element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserMoviesProvider>
                <MoviesPremiumDetails/>
              </UserMoviesProvider>
            </ProtectedRoute>
          }/>

          <Route
            path="/favoris"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <UserMoviesProvider>
                  <UserCategoryProvider>
                    <UserFavoris />
                  </UserCategoryProvider>
                </UserMoviesProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/watch-later"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <UserMoviesProvider>
                  <UserCategoryProvider>
                    <UserWatchLater />
                  </UserCategoryProvider>
                </UserMoviesProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App