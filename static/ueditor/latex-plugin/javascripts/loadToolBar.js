(function(){
	var toolbar = function(){

		this.tabs = new FUI.Tabs( {
			buttons: [ "常用符号", "备用符号", "数学常用公式", "化学"]
      ,selected: 0
		} );

		// 加载panels的内容
		this.panels = [
			//pan-0 不支持big前缀的，因此暂时替换成去掉前缀的
			[[ "\\sqrt{a}","\\sqrt[n]{a}","\\frac{1}{2}","\\vec {a}","\\overrightarrow{AB}","\\overline{x}","\\hat{x}","\C_{m}^{n}","\\sum\\limits_{i=1}^{n}","f'","\\int_{0}^{1}","\\left  \\begin{matrix} x \\\\ y \\end{matrix}\\right","\\xrightarrow[x]{y}","\\xleftarrow[x]{y}"],
				["\\leqslant","\\geqslant","\\neq","\\times","\\div","\\pm","\\mp","\\cdot","^\\circ","\\vee","\\wedge","\\in","\\notin","\\parallel","\\perp","\\angle","\\triangle","\\forall","\\exists","\\neg","\\cup","\\cap","\\complement","\\varnothing", ],
				["\\pi","\\alpha","\\beta","\\gamma","\\theta","\\lambda","\\mu","\\omega","\\varphi","\\infty","\\Longleftarrow","\\Longrightarrow","\\Longleftrightarrow",'\\dfrac{b}{a}','$m$','\\varpropto','\\approx','\\Delta ','\\ce{->[\\text{①}]} ','\\eta','\\nu','\\rho','\\sigma','\\varPhi','\\Omega']],

			//pan-1
			[[ "\\Pi","\\Sigma","\\Psi","\\$","\\epsilon","\\zeta","\\xi","\\tau","\\upsilon","\\phi","\\varphi","\\chi"],
				[ "\\subset", "\\subseteq", "\\supseteq", "\\supset", "\\ni", "\\vdash", "\\dashv", "\\equiv", "\\sim", "\\cong", "\\approx", "\\doteq", "\\propto", "\\ast", "\\star", "\\bullet", "\\oplus", "\\otimes", "\\odot", "\\top", "\\surd", "\\partial", "\\mho", "\\cdots", "\\ddots", "\\vdots", "\\langle", "\\rangle", "\\nexists" ],
				[ "\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Updownarrow", "\\Downarrow", "\\nearrow", "\\searrow", "\\nwarrow", "\\swarrow", "\\longrightarrow", "\\longleftarrow", "\\longleftrightarrow", "\\rightarrow", "\\leftarrow", "\\leftrightarrow", "\\Rightarrow", "\\Leftarrow"],
				["\\sin","\\cos","\\tan","\\cot","\\max","\\min"]],

			//pan-2
			[[ "\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}","\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}","f(x)=A\\sin({\\omega x+\\varphi})+b","\\cos\\theta=\\dfrac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|} =\\dfrac{x_1x_2+y_1y_2}{\\sqrt {x_1^2+y_1^2}\\cdot\\sqrt {x_2^2+y_2^2}}","\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos\\theta","a_n=a_1+(n-1)d","a_n=a_1\\cdot q^{n-1}","a_n=S_n-S_{n-1}","S_n=\\dfrac{(a_1+a_n) n}2","S_n=na_1+\\dfrac{ n(n-1)d}2","S_n=\\dfrac{a_1(1-q^n)}{1-q}","a^2+b^2\\geqslant2ab","a+b\\geqslant2\\sqrt{ab}","|a|-|b|\\leqslant|a\\pm b|\\leqslant|a|+|b|","d=\\sqrt{(x_1-x_2)^2+(y_1-y_2)^2}","\\ d=\\dfrac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}","k=\\dfrac{y_2-y_1}{x_2-x_1}","\\ \\dfrac{y-y_1}{y_1-y_2}=\\dfrac{x-x_1}{x_1-x_2} ","(x-a)^2+(y-b)^2=r^2","x^2+y^2+Dx+Ey+F=0","\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1","y^2=2px","A_n^m=\\dfrac{n!}{(n-m)!}","C_n^m=\\dfrac{n!}{m!(n-m)!}","\\overline x=\\dfrac1n\\sum\\limits_{i=1}^nx_i","S^2=\\dfrac1n\\sum\\limits_{i=1}^n(x_i-\\overline x)^2"]],
			
		//pan-3
      [[ "\\ce{A2 + B2 \\xlongequal{1000^\\circ C} B}", "\\ce{H2 ->[\\Delta]S4^2- + B^2+ O v }", "\\ce{X=Y#Z}",
        "\\ce{Cr(O4)2 * 2O}", "\\ce{^{22}_{90}Th+}", "\\ce{N2  <=>T[加][催] 2NH3}"]],
    ];

		/*
		 * 关于icon占位的一点说明：
		 * （1）基本单位都是32px*32px，高度都统一为32px, 为叙述方便，设1单位宽度为32px；
		 * （2）panels[0][2]前八个为1.5个单位，最后两个为1个单位；
		 * （3）panels[4][0]为4个单位；
		 * （4）panels[5][0]为3个单位；
		 * （5）panels[5][1]为2个单位；
		 * （6）panels[8][2]为1.5个单位
		 *
		 * 关于v1.0版支持情况的说明：
		 * （1）panels[0][1]都不支持--10个；
		 * （2）panels[0][2]前8个不支持--8个；
		 * （3）panels[0][3]不支持\mathds{}, \mathbf{}--2个；
		 * （4）panels[2][1]不支持\|--1个；
		 * （5）panels[2][2]都不支持--6个；
		 * （6）panels[2][3]都不支持--4个；
		 * （7）panels[2][4]都不支持--4个；
		 * （8）panels[2][5]不支持\Box--1个；
		 * （9）panels[3]都不支持；
		 * （10）panels[4]都不支持；
		 * （11）panels[6][0]不支持\lfoor, \rfloor, \|--3个；
		 * （12）panels[7][2]都不支持\lhd, \rhd, \unlhd, \unrhd--4个；
		 * （12）panels[8][0]不支持\setminus--1个；
		 * （13）panels[8][2]不支持\longmapsto--1个；
		 * （14）panels[9][0]不支持\mapsto, \hookleftarrow, \hookrightarrow--3个；
		 * （15）panels[9][1]不支持\dashleftarrow, \dashrightarrow--2个；
		 * （16）panels[10][0]不支持\vartriangle, \square, \diagup, \diagdown--4个；
		 * （17）panels[10][1]不支持\smallsetminus, \intercal--2个；
		 * （18）panels[11][0]不支持\thicksim, \thickapprox, \vartriangleleft, \vartriangleright, \smallsmile, \smallfrown--6个
		 * （19）pannels[12][0]不支持\subsetneqq, \supsetneqq--2个
		 */

	};

	toolbar.prototype.loadToolBar = function(){

		//加载工具栏按钮DOM元素
		var panHtml = [];

		for(var i=0; i<this.panels.length; i++)
		{
			panHtml[i] = "";
			panHtml[i] +="<div id=\"pan-"+ i +"\" class=\"pan fix\">";

			for(var j=0; j<this.panels[i].length; j++)
			{
				var iconsBefore = 0;
				panHtml[i] += "<div id=\"subPan-"+ i + "-" + j +"\" class=\"subPan fix";

				if(j===(this.panels[i].length-1))
					panHtml[i] += " lastSubPan";
				panHtml[i] +="\">";

				for(var k=0; k<this.panels[i][j].length; k++)
				{
					// 计算出前(n-1)个subPan中的元素个数
					iconsBefore = j===0 ? 0 : iconsBefore+this.panels[i][j-1].length;
					panHtml[i] += "<div id=\"icon-"+ i + "-" + j + "-" + k +"\" data-char=\""+ this.panels[i][j][k] +"\" title=\""+ this.panels[i][j][k] +"\"></div>";
				}
				panHtml[i] +="</div>"
			}
			panHtml[i] += "</div>";
		}


		this.tabs.appendTo( document.getElementById("toolbar") );

		$.each( this.tabs.getPanels(), function ( index, panel ) {

			panel.getContentElement().innerHTML = panHtml[index];

		} );

		this.tabs.on( "tabselect", function ( e, info ) {

			var maxHeight= 0,
				$parent = $("#"+info.panel.id + ' .pan');

			$parent.height("auto");
			$("#"+info.panel.id+" .subPan").each(function(){
				var height = $(this).height('100%').height();
				maxHeight = Math.max(maxHeight, height);
			});
			$parent.height(maxHeight);

		} );
    
    setTimeout(function () {
      // $('#toolbar .fui-button:last-child').trigger('tabselect')

    },500)

    window.tabs = this.tabs;
	};

	toolbar.prototype.selectIconCallback = function(){
		var inputContent = $(this).attr("data-char");
		var cursorPos= latexEditor.getCursor();

		latexEditor.replaceSelection(inputContent, latexEditor.getSelection());
		latexEditor.setCursor({line: cursorPos.line, ch: cursorPos.ch+inputContent.length});
	}

	window.toolbar = new toolbar();
})()
