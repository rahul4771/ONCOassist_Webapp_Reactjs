import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { config } from "@oncoassist/shared/constants";



export const handleSearchLink = (deepLink: string | null, type: number) => {
    const navigate = useNavigate();

     if (!deepLink) return; 
    
        console.log('deepLink--' + deepLink);
        //logic for deepLinkPart1
        const match = deepLink.match(/^oncoassist:\/\/(.+)$/);
        const deepLinkPart1 = match ? match[1] : null;  
        //logic for deepLinkPart2
        const match2 = deepLink.match(/^oncoassist:\/\/([^/]+)\/?([^/]*)?/);
        const deepLinkPart2: string = match2?.[2] ?? ""; // logic to find the deepLinkPart2 for AJCC redirection 
        let searchLink: string
        searchLink = `${config.webappURLString}${deepLinkPart1}`;   
        switch (true) {
          case (deepLinkPart1?.includes("prognostic") ?? false): 
            //prognostics                    
            navigate('prognostic_score', { state: { iframeSrc: searchLink } }); 
            break;
          case (deepLinkPart1?.includes("formulas") ?? false): 
            //formulas          
            navigate('formula', { state: { iframeSrc: searchLink } });
            break;          
          case (deepLinkPart1?.includes("adjuvant") ?? false): 
            //adjuvant           
            navigate('adjuvant_tool', { state: { iframeSrc: searchLink } });
            break;
          case (deepLinkPart1?.includes("ajcc8") ?? false): { 
            //AJCC8
            const params = new URLSearchParams({version: "8",name: deepLinkPart2 ?? ""}).toString();
            searchLink = `${config.webappURLString}ajcc/search?${params}`;
    
            navigate('ajcc_tnm_staging', { state: { iframeSrc: searchLink } });
            break;    
          }   
          case (deepLinkPart1?.includes("ajcc9") ?? false): { 
            //AJCC9          
            const params = new URLSearchParams({version: "9",name: deepLinkPart2 ?? ""}).toString();
            searchLink = `${config.webappURLString}ajcc/search?${params}`;
            navigate('ajcc_tnm_staging', { state: { iframeSrc: searchLink } });
            break;    
          } 
          case (deepLinkPart1?.includes("abctool") ?? false): { 
            //abctool       
            navigate('abc_tool', { state: { iframeSrc: searchLink } });
            break;    
          } 
          case (deepLinkPart1?.includes("dic") ?? false): { 
            //drug_interaction_checker       
            navigate('drug_interaction_checker', { state: { iframeSrc: searchLink } });
            break;    
          } 
          case (deepLinkPart1?.includes("nccn") ?? false): { 
            //nccn   
            navigate('nccn_protocol', { state: { iframeSrc: searchLink } });
            break;    
          }   
          case (deepLinkPart1?.includes("ctcae5") ?? false): {  
            //ctcae5
            const params = new URLSearchParams({item: deepLinkPart2 ?? ""}).toString();
            searchLink = `${config.webappURLString}ctcae_v5?${params}`;      
            navigate('toxicity_grading', { state: { iframeSrc: searchLink } });
            break;    
          }
          case (deepLinkPart1?.includes("ctcae") ?? false): {  
            //ctcae4
            const params = new URLSearchParams({item: deepLinkPart2 ?? ""}).toString();
            searchLink = `${config.webappURLString}ctcae_v4?${params}`;      
            navigate('toxicity_grading', { state: { iframeSrc: searchLink } });
            break;    
          }
          case (deepLinkPart1?.includes("ajcc") ?? false): {  
            //ctcae4
            const params = new URLSearchParams({version: "7",item: deepLinkPart2 ?? ""}).toString();
            searchLink = `${config.webappURLString}ajcc?${params}`;      
            navigate('ajcc_tnm_staging', { state: { iframeSrc: searchLink } });
            break;    
          }     
                  
          default:
              console.warn(`Invalid or unsupported deep link section: ${deepLinkPart1}`);
              break;
      }
};