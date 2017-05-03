(function (angular) {
	'use strict';
	//创建模块
	var todoApp = angular.module('todoApp',['service']);
	todoApp.controller( 'todoController',[ '$scope','$location','MyService',function( $scope,$location,MyService ){
		//功能1：数据展示
		$scope.todos = MyService.Data();
		//添加任务
		$scope.newTodo = '';
		$scope.add = function(){
			if( !$scope.newTodo ) return;
			/*$scope.todos.push({
				id:Math.random(),
				name:$scope.newTodo,
				completed:false
			});*/
			MyService.addData($scope.newTodo);
			//置空
			$scope.newTodo = '';
		};
		//删除任务
		$scope.remove = function(id){
			MyService.removeData(id);
		}
		// 修改任务
		$scope.isEditing = -1;
		//让任务双击处于可编辑状态
		$scope.edit = function(id){
			$scope.isEditing = id;
			MyService.save();
		}
		//去掉任务的可编辑状态
		$scope.save = function(){
			$scope.isEditing = -1;
		}

		//修改任务状态
		$scope.statusChange = function(){
			MyService.save();
		}
		//修改全部状态
		$scope.selectAll = false;
		$scope.todoAll = function(){
			MyService.todoAll($scope.selectAll);
		}
		//计算未完成的数量
		$scope.getcount = function(){
			//找到为false的数据
			return MyService.getcount();
			
		}
		// 一键清除
		$scope.clearAll = function(){
			MyService.clearAll();
		}
		//过滤器
		$scope.isCompleted = {}; 
		/*$scope.active = function(){
			$scope.isCompleted = {completed : false}
		}
		$scope.completed = function(){
			$scope.isCompleted = {completed : true}
		}
		$scope.all = function(){
			$scope.isCompleted = {}
		}*/
		$scope.loca = $location;
		$scope.$watch('loca.url()',function(now){
			switch(now){
				case '/active':
				$scope.isCompleted = {completed : false};
				break;
				case '/completed':
				$scope.isCompleted = {completed : true};
				break;
				default:
				$scope.isCompleted = {};
			}
		})
	} ] )

})(angular);
