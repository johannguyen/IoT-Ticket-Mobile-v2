import _ from 'lodash'
import moment from 'moment'

const processResources = data => {
    let res = [];
    const recurse = resource => {
        let resObj = {};
        resObj.id = resource.id;
        resObj.name = resource.name;
        resObj.resourceType = getResourceType(resource);
        let children = [];
        if(resource.enterprises){
            _.forEach(resource.enterprises, function(enterprise){
                let child = recurse(enterprise);
                children.push(child);
            });
        }
        if(resource.sites){
            _.forEach(resource.sites, function(site){
                let child = recurse(site);
                children.push(child);
            });
        }
        if(resource.assets){
            _.forEach(resource.assets, function(asset){
                let child = recurse(asset);
                children.push(child);
            });
        }
        if(!_.isEmpty(children)){
            resObj.children = children;
        }
        return resObj;
    }
    if(data.enterprises){        
        _.forEach(data.enterprises, function(enterprise){
            let child = recurse(enterprise);
            res.push(child);
        });
    }
    if(data.sites){
        _.forEach(data.sites, function(site){
            let child = recurse(site);
            res.push(child);
        });
    }
    return res;
}

const getResourceType = resource => {
    const prefix = resource.id.substring(0,1);
    switch (prefix){
        case "E":
            return "Enterprise";
        case "S":
            return "Site";
        case "A":
            return "Asset";
        case "X":
            return "Device";
        default:
            return "Enterprise";
    }
}

export const fetchResource = async (force, resources) =>{
    if(!force && !resources && !_.isEmpty(resources)){
        return resources;
    }
    else{
        // console.log('get here');
        const response = await fetch('https://qa-dmz.iot-ticket.com/Dashboard/main/api/resources', {credentials: 'include'});
        // console.log(response);
        if(response.url.includes('uaa/login')){
            throw new Error("Unable to fetch resources.")
        }
        const data = await response.json();
        // console.log(data);
        const resources = processResources(data);
        return resources;
    }
}

const processDashboards = data => {
    let res = [];
    let dashboards = {};
    let reports = {};
    if(data.desktops && !_.isEmpty(data.desktops)){
        dashboards.title = "Dashboards";
        dashboards.data = [];
        _.forEach(data.desktops, function(desktop){
            let obj = {};
            obj.id = desktop.desktopId;
            obj.key = desktop.desktopId;
            obj.title = desktop.title;
            obj.createdBy = desktop.createdBy;
            obj.lastEdit = moment(desktop.lastEditedTimestamp).format("YYYY-MM-DD HH:mm");
            obj.type = "desktop";
            dashboards.data.push(obj);
        });
        res.push(dashboards);
    }
    if(data.reports && !_.isEmpty(data.reports)){
        reports.title = "Reports";
        reports.data = [];
        _.forEach(data.reports, function(report){
            let obj = {};
            obj.id = report.id;            
            obj.key = `${report.id}`;
            obj.title = report.name;
            obj.createdBy = report.createdBy;
            obj.type = "report";
            obj.lastEdit = moment(report.lastEditedTimestamp).format("YYYY-MM-DD HH:mm");
            reports.data.push(obj);
        });
        res.push(reports);
    }
    return res;
}

export const fetchDashboards = async resourceId => {    
    let url = `https://qa-dmz.iot-ticket.com/Dashboard/main/api/resources/${resourceId}`;
    const response = await fetch(url, {credentials:'include'});
    if(response.url.includes('uaa/login')){
        throw new Error("Unable to fetch dashboards.")
    }
    const data = await response.json();
    const dashboards = processDashboards(data);
    return dashboards;
}