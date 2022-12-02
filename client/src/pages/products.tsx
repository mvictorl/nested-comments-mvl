// import { useContext } from 'react'
// import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { Container, Typography } from '@mui/material'

const Products = () => {
	// const { store } = useContext(Context)

	return (
		<>
			<Container>
				<Typography textAlign="justify" variant="h3">
					Products
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

export default observer(Products)
