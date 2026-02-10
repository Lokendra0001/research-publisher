import { useSelector } from "react-redux"

const useUserDetail = () => {
    const { user, role, isAuthenticated, loading, initialLoading } = useSelector((state) => state.auth);

    return { user, role, isAuthenticated, loading, initialLoading }
}

export default useUserDetail;