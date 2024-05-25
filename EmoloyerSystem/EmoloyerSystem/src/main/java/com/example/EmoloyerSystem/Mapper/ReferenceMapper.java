package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Reference;
import com.example.EmoloyerSystem.dto.ReferenceDto;

public class ReferenceMapper {
   public static ReferenceDto mapToReferenceDto(Reference Reference)
   {
       return new ReferenceDto(
           Reference.getReference_id(),
           Reference.getName(),
           Reference.getSurname(),
           Reference.getJobposition(),
           Reference.getCompanyname(),
           Reference.getPhone_nr(),
           Reference.getEmail(),
           Reference.getCV().getCvid()
       );
   }
   public static Reference mapToReference(ReferenceDto ReferenceDto,CV CV)
   {
    Reference reference = new Reference();
           reference.setReference_id(ReferenceDto.getReference_id());
           reference.setName(ReferenceDto.getName());
           reference.setSurname(ReferenceDto.getSurname());
           reference.setJobposition(ReferenceDto.getJobposition());
           reference.setCompanyname(ReferenceDto.getCompanyname());
           reference.setPhone_nr(ReferenceDto.getPhone_nr());
           reference.setEmail(ReferenceDto.getEmail());
           reference.setCV(CV);
           return reference;
   }

}
