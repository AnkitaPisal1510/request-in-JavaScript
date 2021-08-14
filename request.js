var fs=require('fs');
const readline=require('readline-sync');
var axoius=require('axios');
// const { request } = require('http');
var url ="http://saral.navgurukul.org/api/courses";
let saral_data1=axoius.get(url)
.then((Response)=>{
    let data=(Response.data)
    let my_json1=JSON.stringify(data,null,4)
    fs.writeFileSync("saral_data.json",my_json1)
    serial_no_1=1
    for (index1 of data['availableCourses']){
        console.log(serial_no_1++,index1['name'],index1['id'])
    }
    courses_no=readline.questionInt('enter the course number:-')
    console.log(data['availableCourses'][courses_no-1]['name'])
    let id=data['availableCourses'][courses_no-1]['id']
    saral_api1=("http://saral.navgurukul.org/api/courses/"+String(data['availableCourses'][courses_no-1]['id'])+"/exercises")
    api_data2= axoius.get(saral_api1)
    .then(Response =>{
        let data_2=Response.data
        let my_json2=JSON.stringify(data_2,null,4)
        fs.writeFileSync('saral_data2.json',my_json2)
        var serial_no_2=1
        var topic_list =[]
        for (index2 of data_2["data"]){
            if (index2["childExercises"].length ==0){
                    console.log(" ",serial_no_2,".",index2["name"])
                    console.log("    ","-",index2["slug"])
                    topic_list.push(index2['name'])
                    serial_no_2+=1                 
            }else{
                let serial_no_3=1
                console.log(" ",serial_no_2,".",index2["name"])
                topic_list.push(index2['name'])
                for (index3 of index2["childExercises"]){
                    console.log("     ",serial_no_3,"-",index3["name"])
                    serial_no_3+=1}
            serial_no_2+=1
        }
    }  
    let slug=readline.questionInt("enter the parent number:-")
    console.log("       ",slug,topic_list[slug-1])
    var s_no=1
    if (data_2["data"][slug-1]["childExercises"].length==0){
        console.log("     ",s_no,"-",data_2["data"][slug-1]["slug"])
    
        ques=readline.questionInt("enter slug number:-")
        new_one=("http://saral.navgurukul.org/api/courses/"+String(data["availableCourses"][courses_no-1]["id"])+"/exercise/getBySlug?slug="+String(data_2["data"][slug-1]["slug"]))
        new_one_link=axoius.get(new_one)
        .then(Response =>{
            let api4=Response.data
            let file4=JSON.stringify(api4,null,4)
            fs.writeFileSync("question1.json",file4)
            console.log(api4["content"])
    })
    }
    else{

    data_2["data"][slug-1]["childExercises"].length != 0
    var s=1
    for (question of  data_2["data"][slug-1]["childExercises"]){
        console.log("        ",s,question["name"])
            s++
    }
    serial_no_2+=1
    var ques=readline.questionInt("enter question number:-")
    var last_link=("http://saral.navgurukul.org/api/courses/"+String(data["availableCourses"][courses_no-1]["id"])+"/exercise/getBySlug?slug="+String(data_2["data"][slug-1]["childExercises"][ques-1]["slug"]))
    last_link_api=axoius.get(last_link)
    .then(Response=>{
        let api3=Response.data
        let file3=JSON.stringify(api3,null,4)
        fs.writeFileSync("QUESTIONS.json",file3)
        console.log(api3["content"])
    })

        }
    

    })
})