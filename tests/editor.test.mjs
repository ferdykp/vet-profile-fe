import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync('../backend/resources/js/app.js','utf8').replace("import Alpine from 'alpinejs';",'const Alpine = {start(){}};');
test('saving an editor list preserves nested values and checkbox states', () => {
 const inputs=[]; const box={innerHTML:'',appendChild(input){ inputs.push(input); }};
 const context={window:{},crypto:{randomUUID:()=> 'test-id'},document:{createElement:()=>({})}};
 vm.runInNewContext(source,context);
 const editor=context.window.postEditor([{type:'list',data:{items:[{content:'Clinical assessment',checked:false,items:[{content:'Follow-up'}]}],style:'ordered'}}]);
 editor.$root={querySelector:()=>box}; editor.serialize();
 const values=Object.fromEntries(inputs.map(x=>[x.name,x.value]));
 assert.equal(values['content[blocks][0][data][items][0][content]'],'Clinical assessment');
 assert.equal(values['content[blocks][0][data][items][0][checked]'],'0');
 assert.equal(values['content[blocks][0][data][items][0][items][0][content]'],'Follow-up');
 assert.equal(values['content[blocks][0][data][style]'],'ordered');
});
