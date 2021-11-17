/* your quiz builder functionality goes here */

const displayExistingQuestions = (existing, target) =>
{
    let parent = target.parentElement;
    console.log(parent, target);
    parent.hidden = false;
    Array.from( parent.children ).forEach(item=> item.hidden = false);

    target.innerHTML = "";

    existing.forEach((item, i)=> {
        let li = document.createElement("li");
        li.innerHTML = item.prompt;
        let del = document.createElement("button");
        del.innerHTML = "DELETE";
        let edit = document.createElement("button");
        edit.innerHTML = "EDIT";

        del.addEventListener("click", evt =>{
            existing.pop(Array.from(evt.target.parentElement.parentElement.children).indexOf(evt.target.parentElement));
            evt.target.parentElement.hidden = true;
        });

        edit.addEventListener("click", evt =>{
            console.log("Edit!");
        });

        li.appendChild(edit);
        li.appendChild(del);
        target.appendChild(li);
    });
}

export {displayExistingQuestions};