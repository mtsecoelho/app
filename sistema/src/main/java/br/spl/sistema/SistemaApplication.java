package br.spl.sistema;

import org.simplejavamail.mailer.Mailer;
import org.simplejavamail.mailer.MailerBuilder;
import org.simplejavamail.mailer.config.TransportStrategy;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SistemaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaApplication.class, args);
	}

	@Bean
	public Mailer mailer() {
		/*
		//GMail Settings
		return MailerBuilder.withSMTPServer("smtp.gmail.com", 587, "emmanoelcoelholima","minhasenha")
          .withTransportStrategy(TransportStrategy.SMTP_TLS)
          .withProxy("172.25.136.131", 8080, "desenvolvimento", "detran99")
          .withSessionTimeout(10 * 1000)
          .clearEmailAddressCriteria()
          .withDebugLogging(true)
          .buildMailer();
        
        //E-mail with attachment
		File f = new File("/home/matheus/upt.txt");
		
		Email email = EmailBuilder.startingBlank()
				.from("Externo", "externo@detran.ce.gov.br")
				.to("Matheus Alves", "emmanoelcoelholima@gmail.com")
		        .withSubject("Teste")
		        .withHTMLText("<img src='cid:wink1'><b>We should meet up!</b><img src='cid:wink2'>")
		        .withPlainText("Please view this email in a modern email client!")
		        .withAttachment(f.getName(), new FileDataSource(f))
		        .withHeader("X-Priority", 5)
		        .buildEmail();

		mailer.sendMail(email);
		*/
		
		return MailerBuilder.withSMTPServer("172.25.136.33", 25, "externo","DeT@#aN72")
        .withTransportStrategy(TransportStrategy.SMTP)
        .withSessionTimeout(10 * 1000)
        .trustingSSLHosts("172.25.136.33")
        .clearEmailAddressCriteria()
        .buildMailer();
	}
}
