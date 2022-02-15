class Logger{
  constructor(config){
    let winston = require('winston');
    const WinstonGraylog2 = require('winston-graylog2');
   
    let logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          timestamp : true,
          colorize: false,
          useConsole: true,
          handleExceptions: true,
          humanReadableUnhandledException: true
        }),
        new WinstonGraylog2({
          servers: [
            {host: 'localhost', port: '12201'},
          ],
        }),
      ]
    });
    
    process.on('unhandledRejection', error => {
      logger.error('UNHANDLED REJECTION', error.stack);
    });
    
    return logger;
  }
}

module.exports = Logger;

async getComprisedComponentsInReclassificationCount(objNumber) {
  const pendingQuestionnaires = await request(objNumber); //get all questionnaires with (ver.n. > 1) && (processingStatus !== 'EU and US Classified')
  let inReclassificationCount = 0;
  await Promise.all(
    pendingQuestionnaires.map(async questionnaire => {
      const prevQuestionnaireVersions = await request(questionnaire.id); //get previous versions of the questionnaire
      const hasBeenClassifiedEarlier = prevQuestionnaireVersions.some(({usEccn, euEccn}) => usEccn && euEccn);
      hasBeenClassifiedEarlier && inReclassificationCount++;
    })
  );
  return inReclassificationCount;
}
