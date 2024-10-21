import { request, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
const subscriptionKey = process.env.Ocp_Apim_Subscription_Key!;
const EDEAL_TOKEN = process.env.EDEAL_TOKEN!;
const EDEAL_API_URL = process.env.EDEAL_API_URL!;
const EFFICY_API_URL = process.env.EFFICY_API_URL!;
//const USER_LOGIN = process.env.USER_LOGIN!;

const testDataPath = path.resolve(__dirname, 'testData.json');
let testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

/**
 * Fonction pour générer une date de naissance aléatoire entre 1950 et 2000
 * @returns {string} Date de naissance au format AAAA-MM-JJ
 */
function getRandomBirthDate(): string {
    const randomYear = Math.floor(Math.random() * (2000 - 1950 + 1)) + 1950;
    const randomMonth = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);
    const randomDay = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
    return `${randomYear}-${randomMonth}-${randomDay}`;
}

/**
 * Fonction pour générer l'heure actuelle au format ISO 8601
 * @returns {string} Heure actuelle au format ISO 8601
 */
function getCurrentDateTime(): string {
    return new Date().toISOString();
}

/**
 * Fonction pour créer une personne dans EDEAL et Efficy
 * @returns {Promise<string>} bean_id de la personne créée
 */
export async function createPersonInEdeal(): Promise<string> {
    // Clear previous requests and responses
    testData.bean_id_person = "";
    testData.last_edeal_api_request = {};
    testData.last_edeal_api_response = {};
    testData.last_efficy_api_request = {};
    testData.last_efficy_api_response = {};

    try {
        fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
    } catch (error) {
        console.error('Error clearing testData.json:', error);
    }

    const edealApiContext = await request.newContext({
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Authorization': EDEAL_TOKEN
        }
    });

    // Appel API pour créer une personne dans EDEAL
    const edealRequestData = {
        "data": {
            "bean_type": "PersonBean",
            "bean_data": {
                "PerCivID": "00023900000474b0",
                "PerFstName": "Thomas",
                "PerName": "FAIVRE",
                "PerTitle": "Directeur zone 51",
                "PerPhone": "+33 6 00 00 00 01",
                "PerMobile": "+33 6 05 04 07 08",
                "PerMail": "geronimo@yopmail.fr",
                "PerAd1": "12 rue des bois",
                "PerAd2": "Batiment G",
                "PerAd3": "Porte 921",
                "PerAd4_": "Marche",
                "PerZip": "75012",
                "PerCity": "PARIS",
                "PerCtrID": "00023900000016fc",
                "PerBusOriginID": "00023900000960f5",
                "PerCSP_": "000239000004679a",
                "PerConsentMail_": "0002390000000484",
                "PerBirthPlace_": "Paris",
                "PerBirthCtr_": "00023900000016fc"
            }
        }
    };

    const edealResponse = await edealApiContext.post(`${EDEAL_API_URL}/Person`, {
        data: edealRequestData
    });

    expect(edealResponse.ok()).toBeTruthy();

    const edealResponseBody = await edealResponse.json();
    const bean_id_person = edealResponseBody.data.bean_id;
    console.log('bean_id:', bean_id_person);

    // Store request and response in testData.json
    testData.bean_id_person = bean_id_person;
    testData.last_edeal_api_request = {
        url: `${EDEAL_API_URL}/Person`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': EDEAL_TOKEN
        },
        data: edealRequestData
    };
    testData.last_edeal_api_response = edealResponseBody;

    try {
        fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
    } catch (error) {
        console.error('Error writing to testData.json:', error);
    }

    // Appel API pour créer une personne dans Efficy
    const currentDateTime = getCurrentDateTime();

    const efficyApiContext = await request.newContext({
        extraHTTPHeaders: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    });

    const requestData = {
        "name": "Thomas FAIVRE",
        "personType": "individual",
        "individual": {
            "title": "M.",
            "lastName": "FAIVRE",
            "firstName": "Thomas",
            "birthDate": "1983-12-01",
            "birthPlace": "Paris X",
            "birthDepartment": "75",
            "birthCountry": "FR",
            "csp": "23",
            "job": "DIR0",
            "nationality": "FR"
        },
        "vip": true,
        "email": "geronimo@yopmail.com",
        "phone": "+33102030405",
        "mobilePhone": "+33652535382",
        "consents": [
            {
                "type": "mail",
                "value": true,
                "optinDate": currentDateTime,
                "optoutDate": null
            },
            {
                "type": "demarchage",
                "value": true,
                "optinDate": currentDateTime,
                "optoutDate": null
            }
        ],
        "address": {
            "streetNumber": "60",
            "streetName": "AV",
            "streetType": "De l'Europe",
            "building": "",
            "address1": "60 Avenue de l'Europe",
            "address2": "",
            "address3": "",
            "city": "Bois Colombes",
            "cityCode": "92009",
            "postCode": "92270",
            "country": "FR",
            "deliveryLine": ""
        },
        "origin": "1",
        "role": "PROSPECT",
        "vendorType": "DIRECT",
        "organization": {
            "code": "INSURER_V-DEDEY"
        },
        "vendor": {
            "code": "INSURER_V-DEDEY"
        },
        "vendorUnit": {
            "code": "INSURER_V-DEDEY"
        },
        "foreignIds": [
            {
                "entity": "CRM/Personne",
                "id": bean_id_person
            }
        ]
    };

    const responseEfficy = await efficyApiContext.post(`${EFFICY_API_URL}/persons/`, {
        data: requestData
    });

    const responseEfficyBody = await responseEfficy.json();

    // Store request and response in testData.json
    testData.last_efficy_api_request = {
        url: `${EFFICY_API_URL}/persons/`,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        },
        data: requestData
    };
    testData.last_efficy_api_response = responseEfficyBody;

    try {
        fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
    } catch (error) {
        console.error('Error writing to testData.json:', error);
    }

    expect(responseEfficy.ok()).toBeTruthy();

    await edealApiContext.dispose();
    await efficyApiContext.dispose();
    return bean_id_person;
}

/**
 * Fonction pour créer une opportunité et une demande de devis
 * @param vendorType - Type de vendeur
 * @param bean_id_person - ID de la personne
 */
export async function createOpportunityAndQuoteRequest(vendorType: string, bean_id_person: string) {
    // Clear previous requests and responses
    testData.bean_id_opportunity = "";
    testData.last_edeal_api_request = {};
    testData.last_edeal_api_response = {};
    testData.last_efficy_api_request = {};
    testData.last_efficy_api_response = {};

    try {
        fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
    } catch (error) {
        console.error('Error clearing testData.json:', error);
    }

    //Création de l'étude dans Efficy (EDEAL) afin d'obtenir le bean_id de l'opportunité

        const apiContext = await request.newContext({
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Authorization': EDEAL_TOKEN
            }
        });

        const date = new Date();
        const today = date.toISOString().split('T')[0];

        const edealRequestData = {
            "data": {
                "bean_type": "OpportunityBean",
                "bean_data": {
                    "opptitle": "Efficy Opp Test",
                    "oppnumref": "Opp ref num",
                    "oppactid": "00023900000043e1",
                    "oppentid": "000239000009870e",
                    "oppperid": "0002390000096629",
                    "oppdate": today,
                    "oppstake": 45,
                    "oppstoid": "0002390000047057",
                    "oppopbid": "0002390000003473",
                    "oppdetail": "Detail Opp",
                    "oppcompetinf": "Compet Inf",
                    "oppmtinvest": 62,
                    "oppstuid": "000239000000342b",
                    "oppbizproviderid": "000239000009870e",
                    "opporiginintid": "0002390000096dc9",
                    "oppecheancedt_": "2023-05-06",
                    "oppdureepreavis_": "00023900000468b3",
                    "oppresildt_": "2015-06-01",
                    "oppprdveos_": "0002390000047093",
                    "opprecoperid_": "0002390000096629",
                    "oppstakeweighted_": 82,
                    "opptenant_": "0002390000044c97",
                    "oppprime_": 62
                }
            }
        };

        const reponseEdealCreateQR = await apiContext.post(`${EDEAL_API_URL}/Opportunity`, {
            data: edealRequestData
        });

        const reponseEDEALBody = await reponseEdealCreateQR.json();
        const bean_id_opportunity = reponseEDEALBody.data.bean_id;
        console.log('bean_id_opportunity:', bean_id_opportunity);

    // Store request and response in testData.json
        testData.bean_id_opportunity = bean_id_opportunity;
        testData.last_edeal_api_request = {
            url: `${EDEAL_API_URL}/Opportunity`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': EDEAL_TOKEN
            },
            data: edealRequestData
        };
        testData.last_edeal_api_response = reponseEDEALBody;

        try {
            fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
        } catch (error) {
            console.error('Error writing to testData.json:', error);
        }

    expect(reponseEdealCreateQR.ok()).toBeTruthy();

    //Création de l'étude dans Efficy (API Yzy)

        const efficyRequestData = {
            "product": {
                "code": "V13AUTO"
            },
            "assured": {
                "foreignIds": [{
                    "entity": "CRM/Personne",
                    "id": bean_id_person
                }]
            },
            "comment": "Ceci est un commentaire",
            "vendorType": vendorType,
            "requestDate": today,
            "effectiveDate": today,
            "vendor": {
                "foreignIds": [{
                    "entity": "VEOS/Login",
                    "id": "pablo.suarez"
                }]
            },
            "foreignIds": [{
                "entity": "CRM/Opportunity",
                "id": bean_id_opportunity
            }]
        };

        const reponseEfficyCreateQR = await apiContext.post(`${EFFICY_API_URL}/quote-requests/`, {
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            data: efficyRequestData
        });

        const responseEfficyBody = await reponseEfficyCreateQR.json();

    // Store request and response in testData.json
        testData.last_efficy_api_request = {
            url: `${EFFICY_API_URL}/quote-requests/`,
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            data: efficyRequestData
        };
        testData.last_efficy_api_response = responseEfficyBody;

        try {
            fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
        } catch (error) {
            console.error('Error writing to testData.json:', error);
        }

    expect(reponseEfficyCreateQR.ok()).toBeTruthy();

    //Vérification de la création de l'étude

        const responseEfficyGetQuoteRequest = await apiContext.get(`${EFFICY_API_URL}/quote-requests/${bean_id_opportunity}`, {
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            params: {
                'foreignEntity': 'CRM/Opportunity'
            }
        });

    const responseEfficyGetQuoteRequestBody = await responseEfficyGetQuoteRequest.json();

    // Store request and response in testData.json
        testData.last_efficy_api_request = {
            url: `${EFFICY_API_URL}/quote-requests/${bean_id_opportunity}`,
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            params: {
                'foreignEntity': 'CRM/Opportunity'
            }
        };
        testData.last_efficy_api_response = responseEfficyGetQuoteRequestBody;

        try {
            fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
        } catch (error) {
            console.error('Error writing to testData.json:', error);
        }

    expect(responseEfficyGetQuoteRequest.ok()).toBeTruthy();

    await apiContext.dispose();
}