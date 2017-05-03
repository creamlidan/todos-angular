(function(angular){
	var app = angular.module('service',[]);
	app.service('MyService',['$window',function($window){
		// 添加数据
		var str = $window.localStorage.getItem('myTodos') || [];
		var todos = JSON.parse(str);
		this.Data = function(){
			return todos;
		}
		//添加数据
		this.addData = function( newTodo ){
			todos.push({
				id:Math.random(),
				name:newTodo,
				completed:false
			});
			//存储
			this.save();
		}
		//删除数据
		this.removeData = function(id){
			for( var i = 0; i < todos.length; i++ ){
				var todoId = todos[i].id;
				if( todoId == id ){
					todos.splice( i,1 );
					this.save();
					return;
				}
			}
		}
		this.save = function(){
			var str = JSON.stringify(todos);
			$window.localStorage.setItem('myTodos', str);
		}
		this.todoAll = function(selectAll){
			for( var i = 0; i < todos.length; i++ ){
				var item = todos[i];
				item.completed = selectAll;
			}
			this.save();
		}
		this.getcount = function(){
			var count = 0;
			for( var i = 0; i < todos.length; i++ ){
				var item = todos[i];
				if( !item.completed ){
					count += 1;
				}
			}
			return count;
		}
		this.clearAll = function(){
			for( var i = todos.length-1; i >= 0; i-- ){
				var item = todos[i];
				if( item.completed ){
					todos.splice(i,1)
				}
			}
			this.save();
		}
	}])
})(angular);