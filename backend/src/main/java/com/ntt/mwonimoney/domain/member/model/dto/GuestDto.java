package com.ntt.mwonimoney.domain.member.model.dto;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class GuestDto extends MemberDto {

}
