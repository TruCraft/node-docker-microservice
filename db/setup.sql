CREATE TABLE `tf2_backpacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `backpack_json` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3766 DEFAULT CHARSET=latin1;

CREATE TABLE `tf2_items` (
  `id` varchar(50) NOT NULL DEFAULT '',
  `date_added` datetime DEFAULT NULL,
  `quality` varchar(10) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
