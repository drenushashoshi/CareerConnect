//package com.example.EmoloyerSystem.Service.impl;
//
//import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
//import com.example.EmoloyerSystem.Mapper.CVMapper;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//import com.example.EmoloyerSystem.Entity.CV;
//import com.example.EmoloyerSystem.Repository.CvRepository;
//import com.example.EmoloyerSystem.dto.CVDto;
//import com.example.EmoloyerSystem.Service.CvService;
//
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.List;
//import java.util.Optional;
//import java.util.function.BiFunction;
//import java.util.function.Function;
//import java.util.stream.Collectors;
//
//import static com.example.EmoloyerSystem.Constant.Constant.Resume_Directiory;
//import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
//
//import java.io.IOException;
//
//@Service
//@AllArgsConstructor
//public class CvServiceImpl implements CvService{
//
//    private  CvRepository CvRepository;
//
//    @Override
//    public CVDto createCv(CVDto CvDto) {
//        CV Cv= CVMapper.mapToCv(CvDto);
//        CV savedCv=CvRepository.save(Cv);
//        return CVMapper.mapToCvDto(savedCv);
//    }
//
//    @Override
//    public CVDto getCvById(int CvID) {
//        CV Cv=CvRepository.findById(CvID)
//                .orElseThrow(()->
//                        new ResourceNotFoundException("Cv does not exist"));
//
//        return CVMapper.mapToCvDto(Cv);
//    }
//
//    @Override
//    public void deleteCv(int CvID) {
//        CV Cv=CvRepository.findById(CvID).orElseThrow(
//                ()-> new ResourceNotFoundException("Cv does not exist")
//        );
//        CvRepository.deleteById(CvID);
//    }
//
//    @Override
//    public CVDto updateCv(int CvID, CVDto updatedCv) {
//        CV Cv=CvRepository.findById(CvID).orElseThrow(
//                ()-> new ResourceNotFoundException("Cv does not exist")
//        );
//        Cv.setProfilepic(updatedCv.getProfilepic());
//        Cv.setName(updatedCv.getName());
//        Cv.setSurname(updatedCv.getSurname());
//        Cv.setEmail(updatedCv.getEmail());
//        Cv.setPhone_nr(updatedCv.getPhone_nr());
//        Cv.setStreet(updatedCv.getStreet());
//        Cv.setCity(updatedCv.getCity());
//        Cv.setDescription(updatedCv.getDescription());
//        Cv.setCollege(updatedCv.getCollege());
//        Cv.setHighschool(updatedCv.getHighschool());
//
//        CV updateCvn=CvRepository.save(Cv);
//
//        return CVMapper.mapToCvDto(updateCvn);
//    }
//
//    @Override
//    public List<CVDto> getAllCvs(){
//        List<CV> Cvs=CvRepository.findAll();
//        return Cvs.stream().map(CVMapper::mapToCvDto)
//                .collect(Collectors.toList());
//    }
//
//    public String uploadPicture(Integer Id, MultipartFile resume) {
//        CVDto CvDto = getCvById(Id);
//        CV Cv = CVMapper.mapToCv(CvDto);
//
//        try {
//            String resumeContent = new String(resume.getBytes()); // Convert MultipartFile to string
//            Cv.setProfilepic(resumeContent); // Set the document content to the string
//            CvRepository.save(Cv); // Save the updated Cv entity
//        } catch (IOException e) {
//            throw new RuntimeException("Unable to read resume content", e);
//        }
//
//        return "Resume uploaded successfully";
//    }
//
//
//
//    public final Function<String,String> fileExtension = filename-> Optional.of(filename).filter(name-> name.contains("."))
//            .map(name-> "."+name.substring(filename.lastIndexOf(".")+1)).orElse(".png");
//
//    public final BiFunction<String,MultipartFile,String> ResumeFunction = (ID,Document)->
//    {
//        try
//        {
//            Path fileStorageLocation = Paths.get(Resume_Directiory).toAbsolutePath().normalize();
//            if (!Files.exists(fileStorageLocation))
//            {
//                Files.createDirectories(fileStorageLocation);
//            }
//            Files.copy(Document.getInputStream(),fileStorageLocation.resolve(ID+fileExtension.apply(Document.getOriginalFilename())),REPLACE_EXISTING);
//            return ServletUriComponentsBuilder.fromCurrentContextPath().path("/Cvs/resume"+ID+fileExtension.apply(Document.getOriginalFilename())).toUriString();
//        }
//        catch (Exception exception)
//        {
//            throw  new RuntimeException("Unable to save resume");
//        }
//    };
//
//}
