package com.bta.api.controller.admin;

import com.bta.api.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/admin/promotion")
public class PromotionController {

    @Autowired
    PromotionService promotionService;

}
