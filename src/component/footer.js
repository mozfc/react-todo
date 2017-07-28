let prppsTypes = {
	clearCompleted : PT.func,
	leftTodos : PT.number,
	todoArr : PT.array,
	view : PT.oneOf(['all','active','active']),
	changeView : PT.func
}

export  default  function Footer(props){
	let {clearCompleted, leftTodos, todoArr, view, changeView} = props
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
					<a
						href="#/all"
						className={view==='all' ? 'selected' : ''}
						onClick = { ev => changeView('all') }
					>All</a>
				</li>
				<li>
					<a
						href="#/active"
						className={view==='active' ? 'selected' : ''}
						onClick = {ev => changeView('active')}
					>Active</a>
				</li>
				<li>
					<a
						href="#/complete"
						className={view==='complete' ? 'selected' : ''}
						onClick = {ev => changeView('complete')}
					>Complete</a>
				</li>
			</ul>
			{Completedvie}
		</footer>
	)
}

Footer.PT = prppsTypes