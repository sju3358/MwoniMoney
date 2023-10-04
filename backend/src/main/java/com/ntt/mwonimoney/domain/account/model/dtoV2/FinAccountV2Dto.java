package com.ntt.mwonimoney.domain.account.model.dtoV2;

import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class FinAccountV2Dto {

    private Long idx;

    private String number;

    private String finAcno;

    private FinAccountStatus status;

    private FinAccountType type;

    private Long remain;

}
