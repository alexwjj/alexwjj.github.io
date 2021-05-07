var logsFunc = function(version) {
  if(typeof window !== 'undefined') {
    console.log(`%c %c\n嘈杂的社会\n不忘初心已经变成了某种奢求\n一句加油💪🏻\n坚持就是胜利✌🏻\n%c 俊劫的学习基地 %c 当前版本：${version}`,
      ` padding: 25px 200px;
        background-image: url(${window.location.origin}/img/logo.png);
        background-size: contain;
        background-repeat: no-repeat;
        color: transparent;`, 
      'color: #3eaf7c; font-size: 16px;margin-bottom: 10px;',
      'background: #35495e; padding: 4px; border-radius: 3px 0 0 3px; color: #fff', 
      'background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff',
    );
  }
}

export default logsFunc;