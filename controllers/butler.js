/**
 * Butler Controller
 */
const butler = (function(){

    const allocateAndReport = function(req, res) {

        if( !(req.body.jobs && typeof req.body.jobs === 'object') ){
            res.send('Invalid parameter', 400);
        }

        let jobs = req.body.jobs;
        
        jobs.sort(function(job1,job2) {
            job1.hours - job2.hours
        })
 
        const totalHours = jobs.reduce(function(total,job){
            return typeof total !=='number'? total.hours + job.hours : total + job.hours
        })

        const totalButlerRequired = Math.ceil(totalHours/8);

        let butlers =[];
        let spreadClientIds = [];
       
        for (let index=0; index < totalButlerRequired; index++) {
            const response = assignJob(jobs,8,spreadClientIds, []);
            butlers[index] = response.reqs
            jobs = response.jobs;
            spreadClientIds = response.clients;
        }
   
        res.json({
            butlers,
            spreadClientIds
        })
    }

    function assignJob(jobs, pendingHours, clients,reqs){

        let currentIndex = undefined;
        let current = 0;
        let last = undefined;

        jobs.forEach(function(job, index){
            
            if(job.hours <= pendingHours && job.hours > current){
                current =  job.hours 
                currentIndex = index
            }
            last = job;
        })



        if(currentIndex >= -1){
            reqs.push(jobs[currentIndex].requestId);
            if(!clients.includes(jobs[currentIndex].clientId)){
                clients.push(jobs[currentIndex].clientId)
            }
            jobs.splice(currentIndex,1)
            
        } else if(last) {
            jobs[jobs.indexOf(last)].hours = last.hours - pendingHours;
            currentIndex = 0;
            current = pendingHours;
            if(!clients.includes(last.clientId)){
                clients.push(last.clientId)
            }
            reqs.push(last.requestId);
        }

        const remainingHours = parseInt(pendingHours - current)
        if(remainingHours && jobs.length > 0){
            assignJob(jobs, remainingHours,clients, reqs);
        }

        return {
            reqs,
            jobs,
            clients
        };
    }

    return {
        allocateAndReport: allocateAndReport
    }

})();

module.exports = butler;