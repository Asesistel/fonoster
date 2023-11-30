#!/usr/bin/env node
/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonoster
 *
 * This file is part of Fonoster
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ARI_INTERNAL_URL, ARI_SECRET, ARI_USERNAME } from "./envs";
import ari from "ari-client";
import wait from "wait-port";
import logger from "@fonoster/logger";
import events from "./events_handler";

const ariHost = ARI_INTERNAL_URL
const ariUsername = ARI_USERNAME;
const ariSecret = ARI_SECRET;

const connection = {
  host: ariHost.split("//")[1].split(":")[0],
  port: parseInt(ariHost.split("//")[1].split(":")[1])
};

wait(connection)
  .then((open) => {
    if (open) {
      // Give time to Media Server to publish the API endpoint
      setTimeout(
        () => ari.connect(ariHost, ariUsername, ariSecret, events),
        10000
      );
      return;
    }

    logger.info(
      "the mediaserver's port did not open before the timeout [ exiting dispatcher ]"
    );
  })
  .catch(logger.error);
