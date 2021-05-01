var logsFunc = function(version) {
  if(typeof window !== 'undefined') {
    console.log(`%c %c\n在一个夜晚，因为一本书\n内心的激情突然如潮水一样蔓延出来\n在那一个瞬间\n你可以成为任何人，成就任何事\n%c 俊劫的学习基地 %c 当前版本：${version}`,
      ` padding: 25px 200px;
        background-image: url(${window.location.origin}/img/hero-img2.png);
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