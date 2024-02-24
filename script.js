const container = document.getElementsByClassName('container');
const title = document.getElementById('title');
const description = document.getElementById('description');
const btn = document.getElementById('btn');


for(let j =0 ; j<localStorage.length ; j++)
{
    let x = localStorage.key(j);
    if(x.startsWith('task'))
    {
    let showntask = localStorage.getItem(x);
    let obj = JSON.parse(showntask);

    const task = document.createElement('div');
    task.setAttribute('id',`${j}`);
    task.setAttribute('class','description');
    if(obj.checked == 1)
    {
        task.style.backgroundColor='lightGreen';
        task.style.textDecoration='line-through';
    }

    const innerDiv = document.createElement('div');
    const para = document.createElement('p');
    para.setAttribute('id','task');

    const definition = document.createElement('p');
    definition.setAttribute('id','definition');

    const innerDiv2 = document.createElement('div');
    innerDiv2.setAttribute('class','action');
    const del = document.createElement('button');
    del.setAttribute('class','delete');
    del.setAttribute('id',`${j}`);

    const done = document.createElement('button');
    done.setAttribute('class','done');
    done.setAttribute('id',`${j}`);

    para.innerText = obj.title;
    definition.innerText = obj.desc;
    del.innerText = '-';
    done.innerHTML = '&#9989;';

    container[0].append(task);
    task.append(innerDiv);
    task.append(innerDiv2);
    innerDiv.append(para);
    innerDiv.append(definition);
    innerDiv2.append(del);
    innerDiv2.append(done);


    del.addEventListener('click',(e)=>{
        const item = document.getElementById(e.target.id);
        task.remove();
        localStorage.removeItem(x);
    });

    done.addEventListener('click',()=>{
        task.style.backgroundColor='lightGreen';
        task.style.textDecoration='line-through';
        obj.checked = 1;
        localStorage.setItem(x,JSON.stringify(obj));
    })
}
}



let id=0;
if(localStorage.length ==0)
{
    id=0;
}
else{
    id= localStorage.getItem('index');
}

const add = ()=>{

    if(title.value && description.value !== '')
    {
    const task = document.createElement('div');
    task.setAttribute('id',`${id}`)
    task.setAttribute('class','description');

    const innerDiv = document.createElement('div');
    const para = document.createElement('p');
    para.setAttribute('id','task');

    const definition = document.createElement('p');
    definition.setAttribute('id','definition');

    const innerDiv2 = document.createElement('div');
    innerDiv2.setAttribute('class','action');
    const del = document.createElement('button');
    del.setAttribute('class','delete');
    del.setAttribute('id',`${id}`);

    const done = document.createElement('button');
    done.setAttribute('id',`${id}`)
    done.setAttribute('class','done');

    para.innerText = title.value;
    definition.innerText = description.value;
    del.innerText = '-';
    done.innerHTML = '&#9989;';

    container[0].append(task);
    task.append(innerDiv);
    task.append(innerDiv2);
    innerDiv.append(para);
    innerDiv.append(definition);
    innerDiv2.append(del);
    innerDiv2.append(done);

    title.value='';
    description.value='';

    let check=0;

    localStorage.setItem(`task${id}`,JSON.stringify({title:para.innerText, desc: definition.innerText , checked: `${check}`}));
    id++;

    localStorage.setItem('index',id);

    del.addEventListener('click',(e)=>{
        const item = document.getElementById(e.target.id);
        item.remove();
        localStorage.removeItem(`task${e.target.id}`);
    });

    done.addEventListener('click',(e)=>{
        task.style.backgroundColor='lightGreen';
        task.style.textDecoration='line-through';
        const taskId = e.target.id;
        const taskData = JSON.parse(localStorage.getItem(`task${taskId}`));
        taskData.checked = 1;
        localStorage.setItem(`task${taskId}`, JSON.stringify(taskData));
    })

}
else{
    alert("Please enter the task and its description");
}
}

btn.addEventListener('click',add);
