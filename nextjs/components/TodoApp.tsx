'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date(),
      priority: priority,
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue('');
    setPriority('medium');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your work and life, finally.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
          {/* Add Todo Section */}
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="What's on your mind?"
                    className="w-full px-5 py-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base shadow-sm transition-all"
                  />
                </div>
                <button
                  onClick={addTodo}
                  disabled={!inputValue.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </button>
              </div>
              
              {/* Priority Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority:</span>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        priority === p
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="px-6 sm:px-8 py-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {activeCount} Active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {completedCount} Completed
                  </span>
                </div>
              </div>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                >
                  Clear completed
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-6 sm:px-8 py-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
            <div className="flex gap-2">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                    filter === f
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Todo List */}
          <div className="p-6 sm:p-8 max-h-[600px] overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full mb-4">
                  <svg className="w-10 h-10 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  {filter === 'all' && 'No tasks yet'}
                  {filter === 'active' && 'No active tasks'}
                  {filter === 'completed' && 'No completed tasks'}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {filter === 'all' && 'Create your first task to get started'}
                  {filter === 'active' && 'All tasks are completed!'}
                  {filter === 'completed' && 'Complete some tasks to see them here'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTodos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className="group relative flex items-start gap-4 p-5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Priority Indicator */}
                    <div className={`w-1 h-full absolute left-0 top-0 bottom-0 rounded-l-2xl ${getPriorityColor(todo.priority)}`} />
                    
                    {/* Checkbox */}
                    <div className="flex-shrink-0 mt-1">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          todo.completed
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600'
                            : 'border-gray-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500'
                        }`}
                      >
                        {todo.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-base font-medium transition-all ${
                        todo.completed
                          ? 'line-through text-gray-400 dark:text-gray-600'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {todo.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {todo.createdAt.toLocaleString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
