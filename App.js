import React from "react";
import {View, Text, Button, ScrollView, Switch} from "react-native";

let id = 0;
const Todo = props => (
	<View>
    <Switch value={props.todo.checked} onValueChange={props.onPressed} />
		<Button onPress={props.onDelete} title="delete" />
		<Text>{props.todo.text}</Text>
	</View>
);

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: []
		};
	}
	addTodo() {
    id++
    const text = `Todo number ${id}`
		this.setState({
			todos: [...this.state.todos, { id: id, text: text, checked: false }]
		});
	}
	deleteTodo(id) {
		this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
	}
	toggleTodo(id) {
		this.setState({
			todos: this.state.todos.map(todo => {
				if (todo.id !== id) return todo;
				return {
					id: todo.id,
					text: todo.text,
					checked: !todo.checked
				};
			})
		});
	}
	render() {
		return (
			<View>
				<Text>Total Todos: {this.state.todos.length} </Text>
				<Text>
					Unchecked Todos:{this.state.todos.filter(todo => todo.checked === false).length}
				</Text>
				<Button onPress={() => this.addTodo()} title="Add Todo" />
				<ScrollView>
					{this.state.todos.map(todo => (
						<Todo
							todo={todo}
							onDelete={() => this.deleteTodo(todo.id)}
							onPressed={() => this.toggleTodo(todo.id)}
						/>
					))}
				</ScrollView>
			</View>
		);
	}
}

