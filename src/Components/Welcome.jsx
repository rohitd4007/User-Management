import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Welcome = (props) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) navigate('/')
    }, [token])
    return <>
        <h1>Welcome to your Home</h1>
    </>
}


export default Welcome   
