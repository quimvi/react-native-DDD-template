/* eslint-disable camelcase */
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/health': {
    /** It returns health status of the service. */
    get: {
      responses: {
        /** Ok */
        200: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
      };
    };
  };
  '/drivers/{id}/credentials': {
    /** It returns the driver credentals for the service specified in the type parameter */
    get: {
      parameters: {
        header: {
          /** the forwarded auth0 token that includes the driver ID */
          'X-Forwarded-Authorization': string;
        };
        path: {
          /** the driver id */
          id: string;
        };
        query: {
          /** the name of the service to generate the key for */
          type: 'firebase';
        };
      };
      responses: {
        /** Ok */
        200: {
          schema: {
            data?: {
              accessToken?: string;
            };
            error?: definitions['error'];
          };
        };
        /** Driver not found */
        404: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
      };
    };
  };
  '/actions/batch': {
    /** It allows driver, fleet manager, traffic controller and admin to submit actions related to route */
    post: {
      parameters: {
        body: {
          /** The action sent by the user. */
          actions?: definitions['actionCreationRequest'][];
        };
      };
      responses: {
        /** Actions submitted */
        207: {
          schema: {
            data?: definitions['actionCreationBatchResponse'];
            error?: { [key: string]: unknown };
          };
        };
        /** Internal server error */
        500: {
          schema: {
            data?: definitions['error'][];
          };
        };
      };
    };
  };
  '/events/route-plan-changed': {
    /** It process lmo.v1.route.changed event. */
    post: {
      parameters: {
        body: {
          /** The base64 encoded value in data field is 'RoutePlanChangedPayload' */
          PubSubMessageRequest?: definitions['PubSubMessageRequest'];
        };
      };
      responses: {
        /** Internal server error */
        200: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
        /** Ok */
        204: {
          schema: {
            data?: { [key: string]: unknown };
            error?: definitions['error'];
          };
        };
      };
    };
  };
}

export interface definitions {
  actionCreationRequest: {
    /** @description The order entity associated with di action is contained in */
    orderId?: string;
    /** @description The route the entity associated with di action is contained in */
    routeId?: string;
    /** @description The task ID the action is related to. Mandatory if stop_id is null */
    taskId?: string;
    /** @description The stop ID the action is related to. Mandatory if task_id is null */
    stopId?: string;
    /** @enum {string} */
    target?: 'warehouse' | 'customer' | 'thirdParty';
    /**
     * @description Type of the task
     * @enum {string}
     */
    taskType?: 'pickup' | 'delivery';
    /**
     * @description Type of the action
     * @enum {string}
     */
    type:
      | 'checkinStop'
      | 'checkinStopSkipGeofence'
      | 'closeStop'
      | 'parcelDelivered'
      | 'parcelPickedup'
      | 'parcelReturned'
      | 'parcelDeliveryFailed'
      | 'parcelPickedupFailed'
      | 'parcelReturnedFailed';
    /**
     * Format: date-time
     * @description RFC-3339 format time of the action.
     */
    executedAt: string;
    /** @description Extra information that may be needed depending on the action. */
    extraInfo?: definitions['extraInfo'][];
    /** @description Location from where the action was sent */
    location?: {
      latitude: number;
      longitude: number;
    };
    /** @description All the steps necessary to fulfill taskID */
    executedSteps?: {
      data?: string[];
      /** @enum {string} */
      type?:
        | 'otp'
        | 'photo'
        | 'barcodes'
        | 'documentId'
        | 'documentIdPhotos'
        | 'signature'
        | 'cashOnDelivery';
    }[];
  };
  actionCreationResponse: {
    /** @description status of the current execution */
    status?: number;
    request?: definitions['actionCreationRequest'];
    data?: {
      /**
       * Format: uuid
       * @description Id of the submitted action
       */
      id?: string;
    };
    error?: definitions['error'];
  };
  actionCreationBatchResponse: {
    result?: definitions['actionCreationResponse'][];
    error?: definitions['error'];
  };
  routePlan: {
    /** Format: uuid */
    id?: string;
    /** Format: uuid */
    driver_id?: string;
    /** Format: date */
    day_of_execution?: string;
    order_ids?: string[];
    stops?: definitions['stop'][];
    /** Format: date-time */
    updated_at?: string;
    /** Format: date-time */
    expire_at?: string;
  };
  stop: {
    /** Format: uuid */
    stop_id?: string;
    location?: definitions['location'];
    tasks?: definitions['task'][];
  };
  task: {
    /** Format: uuid */
    task_id?: string;
    delivered?: boolean;
    /** @enum {string} */
    type?: 'delivery' | 'pickup';
    order?: definitions['dispatchDetail'];
    /** @enum {string} */
    status?: 'closed' | 'failed' | 'open';
    instructions?: definitions['instruction'][];
    /** Format: date-time */
    executed_at?: string;
    extra_info?: definitions['extraInfo'];
  };
  retailerDeliveryInstructions: {
    /** Format: uuid */
    retailer_id?: string;
    configurations?: definitions['instruction'];
  };
  dispatchDetail: {
    /** Format: uuid */
    order_id?: string;
    /** @enum {string} */
    order_model?: 'store_model' | 'warehouse_model';
    order_number?: string;
    another_information?: string;
    cod_currency?: string;
    cod_amount?: number;
    expected_delivery_ts?: definitions['timeslot'];
    expected_pickup_ts?: definitions['timeslot'];
    retailer_details?: definitions['retailer'];
    sales_order_number?: string;
    /** Format: date-time */
    updated_at?: string;
    /** Format: date-time */
    expire_at?: string;
    /** @enum {string} */
    order_type?: 'direct' | 'reverse' | 'b2b' | 'collaborative';
    customer_details?: definitions['customer'];
    packages?: definitions['parcel'][];
  };
  retailer: {
    name?: string;
    /** Format: uuid */
    id?: string;
  };
  timeslot: {
    /** Format: date-time */
    start?: string;
    /** Format: date-time */
    end?: string;
  };
  parcel: {
    /** Format: uuid */
    id?: string;
    barcode?: string;
    height?: number;
    width?: number;
    length?: number;
    volume?: number;
    /** Format: date-time */
    updated_at?: string;
    /** Format: date-time */
    expire_at?: string;
  };
  instruction: {
    /** @enum {string} */
    model?: 'warehouse_model' | 'store_model';
    /** @enum {string} */
    type?: 'pickup' | 'delivery';
    /** @enum {string} */
    target?: 'warehouse' | 'customer' | 'thirdParty';
    /** @description the order in which the instructions are executed */
    priority?: number;
    steps?: definitions['step'][];
  };
  step: {
    /** @enum {string} */
    name?: 'photo' | 'scan' | 'manualConfirmation' | 'signature';
    mandatory?: boolean;
    attempts?: number;
    /** @description the order in which the steps must be executed */
    priority?: number;
    /** @description if a step may be impossible to be executed a fallback step that can't fail must be provided. One level of nesting is allowed. */
    fallback?: definitions['stepFallback'];
  };
  stepFallback: {
    /** @enum {string} */
    name?: 'photo' | 'scan' | 'manualConfirmation' | 'signature';
    mandatory?: boolean;
    attempts?: number;
    /** @description the order in which the steps must be executed */
    priority?: number;
  };
  extraInfo: {
    /** @enum {string} */
    key?:
      | 'failReason'
      | 'alternativeAddress'
      | 'notes'
      | 'phoneNumber'
      | 'recipientName'
      | 'relationship';
    value?: string;
  };
  location: {
    latitude?: number;
    longitude?: number;
  };
  address: string;
  customer: {
    name?: string;
    phone?: string;
  };
  error: {
    /** Format: int */
    code?: number;
    message?: string;
  };
  /** @description It is the payload generated by the push subscriptions in GCP. It adds metadata information to the event. The data field contains the base64 encoded json of the event. */
  PubSubMessageRequest: {
    /** @description data value can change depending on the event wrapped. The value is a base64 encoded json representation of one of the events defined. */
    message?: {
      attributes?: {
        /** @enum {string} */
        event_name?: 'lmo.v1.route.changed';
      };
      /** Format: base64 */
      data?: string;
    };
  };
  RoutePlanChangedPayload: {
    route_id?: string;
    order_id?: string;
    action_id?: string;
  };
}

export interface operations {}

export interface external {}
