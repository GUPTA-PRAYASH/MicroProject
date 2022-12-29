/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/* global jsonStr, get, jsonStrObj, connToken, jpdbBaseUrl, jpdbIRL */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jbdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var stdDBName = 'SCHOOL-DB';
var stdRelationName = 'STUDENT-TABLE';
var conntoken = '90938241|-31949273387242694|90952521';

$('#Roll_No').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getStdIdAsJsonObj(){
    var stdid = $('stdid').val();
    var jsonstr = {
        id:stdid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $('#Roll_No').val(data.rollno);
    $('#Full_Name').val(data.name);
    $('#Class').val(data.stdclass);
    $('#Birth_Date').val(data.birthdate);
    $('#Adress').val(data.address);
    $('#Enrollment_Date').val(data.enrollmentdate);
}

function resetForm(){
    $('#Roll_No').val("");
    $('#Full_Name').val("");
    $('#Class').val("");
    $('#Birth_Date').val("");
    $('#Adress').val("");
    $('#Enrollment_Date').val("");
    $('#Roll_No').prop("disabled",false);
    $('#save').prop("disabled",true);
    $('#change').prop("disabled",true);
    $('#reset').prop("disabled",true);
    $('#Roll_No').focus();
}

function validateData(){
    var Roll_No,Full_Name,Class, Birth_Date, Address, Enrollment_Date;
    Roll_No=$("#Roll_No").val();
    Full_Name=$("#Full_Name").val();
    Class=$("#Class").val();
    Birth_Date=$("#Birth_Date").val();
    Address=$("#Address").val();
    Enrollment_Date=("#Enrollment_Date").val();
    
    if(Roll_No === ''){
        alert("Roll_No is missing");
        $("#Roll_No").focus();
        return "";
    }
    if(Full_Name === ''){
        alert("Full_Name is missing");
        $("#Full_Name").focus();
        return "";
    }
    if(Class === ''){
        alert("Class is missing");
        $("#Class").focus();
        return "";
    }
    if(Birth_Date === ''){
        alert("Birth_Date is missing");
        $("#Birth_Date").focus();
        return "";
    }
    if(Address === ''){
        alert("Address is missing");
        $("#Address").focus();
        return "";
    }
    if(Enrollment_Date === ''){
        alert("Enrollment_Date is missing");
        $("#Enrollment_Date").focus();
        return "";
    }
    var jsonStrObj = {
        rollno:Roll_No,
        name:Full_Name,
        stdclass:Class,
        birthdate:Birth_Date,
        address:Address,
        enrollmentdate:Enrollment_Date
    };
    return JSON.stringify(jsonStrObj);
}

function getStd(){
    var stdIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stdDBName,stdRelationName,stdIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseUrl,jpdbIRL);
    jQuery.ajaxSetup({async:false});
    if(resJsonObj.status === 400){
        $('#save').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#Full_Name').focus();
    } else if(resJsonObj.status === 200){
        $("#Roll_No").prop("disabled", true);
        fillData(resJsonObj);
        
        $('#change').prop("disabled", false); 
        $('#reset').prop("disabled", false);
        $("#Full_Name").focus();
    }
}

function saveData(){
    var jsonObj = validateData();
    if(jsonObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,stdDBName,stdRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("Roll_No").focus();
}

function changeData(){
    $('#change').prop("disabled", true);
    var jsonObj = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonObj,stdDBName,stdRelationName,localStorage.getItem());
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:false});
    console.log(resJsonObj);
    resetForm();
    $('#Roll_No').focus();
}
