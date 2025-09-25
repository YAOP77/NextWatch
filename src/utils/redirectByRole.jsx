const Redirection = ( navigate, role ) => {
    const roleRouter = {
        admin: "/admin/dashboard",
        user: "/movies"
    }

    const path = roleRouter[role] || "/login";
    navigate(path);
}

export default Redirection;