ALTER TABLE t_p23508379_website_design_proje.leads ADD COLUMN client_id varchar(64);
CREATE UNIQUE INDEX leads_client_id_uniq ON t_p23508379_website_design_proje.leads (client_id);