import { request, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const subscriptionKey = process.env.Ocp_Apim_Subscription_Key!;
const EDEAL_API_URL = process.env.EDEAL_API_URL!;
const EFFICY_API_URL = process.env.EFFICY_API_URL!;

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
    const apiContext = await request.newContext({
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Authorization': subscriptionKey
        }
    });

    // Appel API pour créer une personne dans EDEAL
    const response = await apiContext.post(`${EDEAL_API_URL}/Person`, {
        data: {
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
        }
    });

    console.log(response.status());
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    const bean_id_person = responseBody.data.bean_id;
    console.log('bean_id:', bean_id_person);

    // Appel API pour créer une personne dans Efficy
    const currentDateTime = getCurrentDateTime();
    const responseEfficy = await apiContext.post(`${EFFICY_API_URL}/persons/`, {
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        },
        data: {
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
                    "optinDate": currentDateTime, // Heure actuelle générée
                    "optoutDate": null
                },
                {
                    "type": "demarchage",
                    "value": true,
                    "optinDate": currentDateTime, // Heure actuelle générée
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
        }
    });

    console.log(responseEfficy.status());
    expect(responseEfficy.ok()).toBeTruthy();

    await apiContext.dispose();
    return bean_id_person;
}

/**
 * Fonction pour créer une opportunité et une demande de devis
 * @param vendorType - Type de vendeur
 * @param bean_id_person - ID de la personne
 */
export async function createOpportunityAndQuoteRequest(vendorType: string, bean_id_person: string) {
    const apiContext = await request.newContext({
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Authorization': subscriptionKey
        }
    });

    const date = new Date();
    const today = date.toISOString().split('T')[0];

    const reponseEDEAL = await apiContext.post(`${EDEAL_API_URL}/Opportunity`, {
        data: {
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
        }
    });

    console.log(reponseEDEAL.status());
    expect(reponseEDEAL.ok()).toBeTruthy();

    const reponseEDEALBody = await reponseEDEAL.json();
    const bean_id_opportunity = reponseEDEALBody.data.bean_id;
    console.log('bean_id_opportunity:', bean_id_opportunity);

    const reponseAPIEfficy = await apiContext.post(`${EFFICY_API_URL}/quote-requests/`, {
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        },
        data: {
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
        }
    });

    expect(reponseAPIEfficy.ok()).toBeTruthy();
    const responseEfficyBody = await reponseAPIEfficy.json();
    console.log(responseEfficyBody);

    const responseCore = await apiContext.get(`${EFFICY_API_URL}`, {
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        },
        params: {
            'foreignIds.id': bean_id_opportunity,
            'foreignIds.entity': 'CRM/Opportunity'
        }
    });

    expect(responseCore.ok()).toBeTruthy();
    const responseCoreBody = await responseCore.json();
    console.log('Response from GET API call:', responseCoreBody);

    await apiContext.dispose();
}