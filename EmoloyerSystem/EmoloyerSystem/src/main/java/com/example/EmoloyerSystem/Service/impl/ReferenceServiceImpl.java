package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.ReferenceMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Reference;
import com.example.EmoloyerSystem.Repository.CvRepository;
import com.example.EmoloyerSystem.Repository.ReferenceRepository;
import com.example.EmoloyerSystem.dto.ReferenceDto;
import com.example.EmoloyerSystem.Service.ReferenceService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReferenceServiceImpl implements ReferenceService{

   private  ReferenceRepository ReferenceRepository;
   private CvRepository CvRepository;

   @Override
   public ReferenceDto createReference(ReferenceDto ReferenceDto, CV CV) {
       Reference Reference= ReferenceMapper.mapToReference(ReferenceDto,CV);
       Reference savedReference=ReferenceRepository.save(Reference);
       return ReferenceMapper.mapToReferenceDto(savedReference);
   }

   @Override
   public ReferenceDto getReferenceById(int ReferenceID) {
       Reference Reference=ReferenceRepository.findById(ReferenceID)
               .orElseThrow(()->
                       new ResourceNotFoundException("Reference does not exist"));

       return ReferenceMapper.mapToReferenceDto(Reference);
   }

   @Override
   public void deleteReference(int ReferenceID) {
       Reference Reference=ReferenceRepository.findById(ReferenceID).orElseThrow(
               ()-> new ResourceNotFoundException("Reference does not exist")
       );
       ReferenceRepository.deleteById(ReferenceID);
   }

   @Override
   public ReferenceDto updateReference(int ReferenceID, ReferenceDto updatedReference) {
       Reference Reference=ReferenceRepository.findById(ReferenceID).orElseThrow(
               ()-> new ResourceNotFoundException("Reference does not exist")
       );
       Reference.setName(updatedReference.getName());
       Reference.setSurname(updatedReference.getSurname());
       Reference.setJobposition(updatedReference.getJobposition());
       Reference.setCompanyname(updatedReference.getCompanyname());
       Reference.setPhone_nr(updatedReference.getPhone_nr());
       Reference.setEmail(updatedReference.getEmail());
       Reference updateReferencen=ReferenceRepository.save(Reference);

       return ReferenceMapper.mapToReferenceDto(updateReferencen);
   }
   @Override
   public List<Reference> getReferenceByCvId(int CvId) {
    CV CV = CvRepository.findById(CvId).orElseThrow(()-> new ResourceNotFoundException("Reference does not exist"));
       List<Reference> References = ReferenceRepository.findByCV(CV).orElseThrow(
               ()-> new ResourceNotFoundException("Reference does not exist")
       );
       return References;
   }

   @Override
   public List<ReferenceDto> getAllReferences(){
       List<Reference> References=ReferenceRepository.findAll();
       return References.stream().map(ReferenceMapper::mapToReferenceDto)
               .collect(Collectors.toList());
   }

}