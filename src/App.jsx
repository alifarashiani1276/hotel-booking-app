import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkListProvider from "./components/context/BookmarkListContext";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import AuthProvier from "./components/context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvier>
      <BookmarkListProvider>
        <HotelsProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "var(--text-700)",
                background: "var(--white)",
                borderRadius: "0.9rem",
                padding: "0.75rem 1rem",
                boxShadow: "0 16px 40px -18px rgba(35, 38, 47, 0.35)",
              },
              success: {
                iconTheme: {
                  primary: "var(--teal-600)",
                  secondary: "var(--white)",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--primary-600)",
                  secondary: "var(--white)",
                },
              },
            }}
          />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarkListProvider>
    </AuthProvier>
  );
}

export default App;

// authentication => who is he /she ? : information => name, ...
// authorization => what access have to routes or files ()
// role => user, admin, content manager ,...
