import React from 'react'
import './NotFound.scss'

 const NotFound = () => {
    return (
			<React.Fragment>
				<h2 className="center-align">Упс, кажется такой страницы нет. Вернитесь на <a href='/'>главную</a></h2>
				<div className="fighters">
					<div className="fighter left-fighter"></div>
					<div className="fighter right-fighter"></div>				
				</div>

			</React.Fragment>
    )
}

export default NotFound
