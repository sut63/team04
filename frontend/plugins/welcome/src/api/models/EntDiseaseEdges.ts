/* tslint:disable */
/* eslint-disable */
/**
 * SUT SA Example API Patient
 * This is a sample server for SUT SE 2563
 *
 * The version of the OpenAPI document: 1.0
 * Contact: support@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    EntArea,
    EntAreaFromJSON,
    EntAreaFromJSONTyped,
    EntAreaToJSON,
    EntDiagnosis,
    EntDiagnosisFromJSON,
    EntDiagnosisFromJSONTyped,
    EntDiagnosisToJSON,
    EntDiseasetype,
    EntDiseasetypeFromJSON,
    EntDiseasetypeFromJSONTyped,
    EntDiseasetypeToJSON,
    EntDrug,
    EntDrugFromJSON,
    EntDrugFromJSONTyped,
    EntDrugToJSON,
    EntEmployee,
    EntEmployeeFromJSON,
    EntEmployeeFromJSONTyped,
    EntEmployeeToJSON,
    EntSeverity,
    EntSeverityFromJSON,
    EntSeverityFromJSONTyped,
    EntSeverityToJSON,
} from './';

/**
 * 
 * @export
 * @interface EntDiseaseEdges
 */
export interface EntDiseaseEdges {
    /**
     * Area holds the value of the area edge.
     * @type {Array<EntArea>}
     * @memberof EntDiseaseEdges
     */
    area?: Array<EntArea>;
    /**
     * Diagnosis holds the value of the diagnosis edge.
     * @type {Array<EntDiagnosis>}
     * @memberof EntDiseaseEdges
     */
    diagnosis?: Array<EntDiagnosis>;
    /**
     * 
     * @type {EntDiseasetype}
     * @memberof EntDiseaseEdges
     */
    diseasetype?: EntDiseasetype;
    /**
     * Drug holds the value of the drug edge.
     * @type {Array<EntDrug>}
     * @memberof EntDiseaseEdges
     */
    drug?: Array<EntDrug>;
    /**
     * 
     * @type {EntEmployee}
     * @memberof EntDiseaseEdges
     */
    employee?: EntEmployee;
    /**
     * 
     * @type {EntSeverity}
     * @memberof EntDiseaseEdges
     */
    severity?: EntSeverity;
}

export function EntDiseaseEdgesFromJSON(json: any): EntDiseaseEdges {
    return EntDiseaseEdgesFromJSONTyped(json, false);
}

export function EntDiseaseEdgesFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntDiseaseEdges {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'area': !exists(json, 'Area') ? undefined : ((json['Area'] as Array<any>).map(EntAreaFromJSON)),
        'diagnosis': !exists(json, 'Diagnosis') ? undefined : ((json['Diagnosis'] as Array<any>).map(EntDiagnosisFromJSON)),
        'diseasetype': !exists(json, 'Diseasetype') ? undefined : EntDiseasetypeFromJSON(json['Diseasetype']),
        'drug': !exists(json, 'Drug') ? undefined : ((json['Drug'] as Array<any>).map(EntDrugFromJSON)),
        'employee': !exists(json, 'Employee') ? undefined : EntEmployeeFromJSON(json['Employee']),
        'severity': !exists(json, 'Severity') ? undefined : EntSeverityFromJSON(json['Severity']),
    };
}

export function EntDiseaseEdgesToJSON(value?: EntDiseaseEdges | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'area': value.area === undefined ? undefined : ((value.area as Array<any>).map(EntAreaToJSON)),
        'diagnosis': value.diagnosis === undefined ? undefined : ((value.diagnosis as Array<any>).map(EntDiagnosisToJSON)),
        'diseasetype': EntDiseasetypeToJSON(value.diseasetype),
        'drug': value.drug === undefined ? undefined : ((value.drug as Array<any>).map(EntDrugToJSON)),
        'employee': EntEmployeeToJSON(value.employee),
        'severity': EntSeverityToJSON(value.severity),
    };
}


