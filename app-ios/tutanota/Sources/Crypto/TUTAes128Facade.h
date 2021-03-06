//
//  TUTAes128Facade.h
//
//  Created by Tutao GmbH on 20.10.16.
//  Copyright © 2016 Tutao GmbH. All rights reserved.
//



extern NSInteger const TUTAO_IV_BYTE_SIZE;

@interface TUTAes128Facade : NSObject

- (NSData*)encrypt:(NSData*)plainText withKey:(NSData*)key withIv:(NSData*)iv error:(NSError**)error;
- (BOOL)encryptStream:(NSInputStream*)plainText result:(NSOutputStream*)output withKey:(NSData*)key withIv:(NSData*)iv error:(NSError**)error;

- (NSData*)decrypt:(NSData*)encryptedData withKey:(NSData*)key error:(NSError**)error;
- (BOOL)decryptStream:(NSInputStream*)encryptedData result:(NSOutputStream*)output withKey:(NSData*)key error:(NSError**)error;
@end


