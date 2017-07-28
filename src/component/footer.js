import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
let prppsTypes = {
	clearCompleted : PT.func,
	leftTodos : PT.number,
	todoArr : PT.array,
	view : PT.oneOf(['all','active','active']),
	changeView : PT.func,
	pathname : PT.string
}

export  default  function Footer(props){
	let {clearCompleted, leftTodos, todoArr, pathname} = props
	let Completedvie = null

	if (leftTodos < todoArr.length) {
		Completedvie =
				<button className="clear-completed" onClick={clearCompleted}>
					clear all complete
				</button>

	}

	return(
		<footer className="footer">
			<span className="todo-count">
				<strong>{leftTodos}</strong>
				<span>item left</span>
			</span>
			<ul className="filters">
				<li>
					<Link
						to="/"
						className={pathname==='/' ? 'selected' : ''}
					>All</Link>
				</li>
				<li>
					<Link
						to="/active"
						className={pathname==='/active' ? 'selected' : ''}
					>Active</Link>
				</li>
				<li>
					<Link
						to="/complete"
						className={pathname==='/complete' ? 'selected' : ''}
					>Complete</Link>
				</li>
			</ul>
			{Completedvie}
		</footer>
	)
}

Footer.PT = prppsTypes