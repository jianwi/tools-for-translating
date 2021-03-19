export default {
    save(key:string,val:string):void{
        localStorage.setItem(key,val)
    },
    get(key:string):string{
        const res = localStorage.getItem(key)
        return res?res:""
    },
    getInput():string{
        return this.get('input')
    },
    setInput(val:string):void{
        this.save('input',val)
    },
    getTranslated():string{
        return this.get('translated')
    },
    setTranslated(val:string):void{
        this.save('translated',val)
    }
}