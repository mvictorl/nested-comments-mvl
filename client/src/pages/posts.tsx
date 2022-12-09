import { useEffect } from 'react'
// import { Context } from '../index'
// import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

const Posts = () => {
	const auth = useAuth()
	// const { store } = useContext(Context)
	const navigate = useNavigate()

	useEffect(() => {
		if (!auth.isAuth) navigate('/login')
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<Container>
				<Typography textAlign="justify" variant="h3">
					Posts
				</Typography>
				<Typography textAlign="justify">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime et ea
					distinctio repellendus veritatis officia, sunt explicabo repudiandae
					vitae at sed. Molestiae hic autem deserunt quasi laudantium deleniti.
					Expedita, a!
				</Typography>
			</Container>
		</>
	)
}

export default Posts
