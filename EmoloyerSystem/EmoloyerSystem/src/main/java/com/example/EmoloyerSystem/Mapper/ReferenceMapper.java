//package com.example.EmoloyerSystem.Mapper;
//
//import com.example.EmoloyerSystem.Entity.Reference;
//import com.example.EmoloyerSystem.dto.ReferenceDto;
//
//public class ReferenceMapper {
//    public static ReferenceDto mapToReferenceDto(Reference Reference)
//    {
//        return new ReferenceDto(
//            Reference.getReference_id(),
//            Reference.getName(),
//            Reference.getSurname(),
//            Reference.getJobposition(),
//            Reference.getCompanyname(),
//            Reference.getPhone_nr(),
//            Reference.getEmail(),
//            Reference.getCv_id()
//        );
//    }
//    public static Reference mapToReference(ReferenceDto Reference)
//    {
//        return new Reference(
//            Reference.getReference_id(),
//            Reference.getName(),
//            Reference.getSurname(),
//            Reference.getJobposition(),
//            Reference.getCompanyname(),
//            Reference.getPhone_nr(),
//            Reference.getEmail(),
//            Reference.getCv_id()
//        );
//    }
//
//}
