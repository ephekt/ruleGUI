var VarSelect = new Class({
    initialize: function(div){
        this.tempArray = new Array();
        this.stregexp = new RegExp();
        var obj = this;
        this.title = new Element("strong", {style:"width:100%"})
        this.selObj = new Element("select", {size:8, style:"width:100%"});
        this.inputBox = new Element("input", {style:"width:80%", class:"rounded", type:"text", size:14});
        this.inputBox.onkeyup = function(){obj.narrow()};
        $$(div).adopt(this.title, new Element("br"), this.inputBox, new Element("br"), this.selObj, new Element("br"), this.button);
       this.options = new Array();
    },
    addOption: function(str){
        var opt =  new Element('option', {class:"dragList", html:str});
        this.options.include(opt);
        this.narrow();
        return opt;
    },
    //kind of ineffecient
    removeOption: function(str){
        var sel = this;
        if (this.options.some(function(element){
            if (element.get('html') == str) {
                $$(sel.selObj.options).dispose();
                sel.options.erase(element);
                element.destroy();
                return true;
            }
            return false;
        })) 
            this.narrow();
    },
    narrow: function(){
        $$(this.selObj.options).dispose();
        var str = this.inputBox.value;
        // if the length of str is 0, bypass everything else
        if (str.length == 0)
            this.selObj.adopt(this.options);
        else {
            var sel = this;
            this.options.each(function(element){
                if (element.get('html').test(str, "i"))
                    sel.selObj.adopt(element);
            });
        }
    }
});