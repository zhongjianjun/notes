## 一边固定一边自适应

### 一、左边固定，右边自适应的布局

左边左浮动，右边加个overflow:hidden

	#lt{ float: left;width:200px; background: #ff0;}
	#rt{ overflow: hidden; background: #f0f;}

左边左浮动，右边加个margin-left;

	#lt{ float: left; width:200px; background: #ff0;}
	#rt{ margin-left: 200px; background: #f0f;}

左边绝对定位，右边加个margin-left;

	#lt{ position: absolute; top:0; left:0; width:200px; background: #ff0;}
	#rt{ margin-left: 200px; background: #f0f;}

左右两边绝对定位，右边加个width,top,left,right

	#lt{ position: absolute; top:0 ; left:0 ;width:200px; background: #ff0;}
	#rt{ position: absolute; top:0 ; left:200px; width: 100% ; rigth:0;background: #f0f;}

### 二、右边固定，左边自适应的布局

1. 左边左浮动，margin-left负值,右边右浮动;

		#lt{float:left; width:100%;background: #00f;margin-right: -200px;}
		#rt{float: right; width: 200px;background: #ff0;}

2. 右边绝对定位，左边margin-right;

		#lt{margin-right:200px; background: #00f;}
		#rt{ position: absolute; right:0; top:0; width: 200px;background: #ff0;}

3. 左右两边绝对定位，左边加个width,top,left,right

		#lt{ position: absolute; top:0; left:0; rigth:0; width: 100% ; background: #f0f;}
		#rt{ position: absolute; top:0; left:200px; width:200px; background: #ff0;}